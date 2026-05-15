const FEEDS = [
  { source: 'LANDR Blog', url: 'https://blog.landr.com/feed/', type: 'Music Production' },
  { source: 'Bedroom Producers Blog', url: 'https://bedroomproducersblog.com/feed/', type: 'Free Plugins / Production' },
  { source: 'MusicTech', url: 'https://musictech.com/feed/', type: 'Music Technology' },
  { source: 'Attack Magazine', url: 'https://www.attackmagazine.com/feed/', type: 'Electronic / Sound Design' },
  { source: 'Produce Like A Pro', url: 'https://producelikeapro.com/blog/feed/', type: 'Mixing / Recording' },
  { source: 'Tracklib Blog', url: 'https://www.tracklib.com/blog/rss.xml', type: 'Sampling / Business' }
];

function stripHtml(input = '') {
  return String(input)
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}
function tag(xml, name) {
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i');
  const m = xml.match(re);
  return stripHtml(m ? m[1] : '');
}
function attrTag(xml, tagName, attrName) {
  const re = new RegExp(`<${tagName}[^>]*${attrName}=["']([^"']+)["'][^>]*>`, 'i');
  const m = xml.match(re);
  return m ? stripHtml(m[1]) : '';
}
function parseFeed(xml, feed) {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  return blocks.slice(0, 8).map((block) => {
    let link = tag(block, 'link');
    if (!link) link = attrTag(block, 'link', 'href');
    const title = tag(block, 'title');
    const summary = tag(block, 'description') || tag(block, 'summary') || tag(block, 'content:encoded');
    const publishedAt = tag(block, 'pubDate') || tag(block, 'updated') || tag(block, 'published');
    return { source: feed.source, type: feed.type, title, summary: summary.slice(0, 260), url: link, publishedAt };
  }).filter(x => x.title && x.url);
}
async function fetchWithTimeout(url, timeout = 8000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'ProducerTrendRadar/1.0' } });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.text();
  } finally { clearTimeout(timer); }
}
async function translateKo(text) {
  const clean = stripHtml(text).slice(0, 420);
  if (!clean) return '';
  try {
    const url = `https://api.mymemory.translated.net/get?langpair=en|ko&q=${encodeURIComponent(clean)}`;
    const res = await fetch(url, { headers: { 'User-Agent': 'ProducerTrendRadar/1.0' } });
    if (!res.ok) throw new Error('translate failed');
    const json = await res.json();
    const out = json?.responseData?.translatedText;
    if (!out || /INVALID|QUERY LENGTH/i.test(out)) return clean;
    return stripHtml(out);
  } catch (e) {
    return clean;
  }
}
function fallbackTips() {
  return [
    {
      source: 'Fallback Tip DB', type: 'A&R / Demo', title: 'Make the hook obvious in the first minute',
      titleKo: '1분 안에 훅의 정체성이 보여야 합니다',
      summary: 'A&R listeners often decide quickly. Prove the hook, the vocal tone, and the target market before over-arranging the demo.',
      summaryKo: '기획사 A&R은 빠르게 판단하는 경우가 많습니다. 데모를 과하게 편곡하기 전에 훅, 보컬 톤, 타깃 시장을 먼저 증명하세요.',
      url: '', publishedAt: new Date().toISOString()
    },
    {
      source: 'Fallback Tip DB', type: 'Mixing', title: 'If the chorus feels small, reduce the verse first',
      titleKo: '후렴이 작게 느껴지면 먼저 벌스를 줄여보세요',
      summary: 'Contrast often creates impact more effectively than adding more layers.',
      summaryKo: '악기를 더 얹는 것보다 벌스의 에너지를 줄여 대비를 만드는 편이 더 강한 임팩트를 줄 때가 많습니다.',
      url: '', publishedAt: new Date().toISOString()
    }
  ];
}
export default async function handler(req, res) {
  try {
    const feedResults = await Promise.allSettled(FEEDS.map(async (feed) => {
      const xml = await fetchWithTimeout(feed.url);
      return parseFeed(xml, feed);
    }));
    let items = feedResults.flatMap(r => r.status === 'fulfilled' ? r.value : []);
    const seen = new Set();
    items = items.filter(item => {
      const key = `${item.source}_${item.title}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 18);

    const translated = [];
    for (const item of items.slice(0, 12)) {
      const titleKo = await translateKo(item.title);
      const summaryKo = await translateKo(item.summary);
      translated.push({ ...item, titleKo, summaryKo });
    }
    const finalItems = translated.length ? translated : fallbackTips();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    res.status(200).json({ updatedAt: new Date().toISOString(), sourceCount: FEEDS.length, items: finalItems, note: 'RSS 제목과 짧은 요약만 한국어로 번역합니다. 원문 전문은 각 사이트 링크에서 확인하세요.' });
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800');
    res.status(200).json({ updatedAt: new Date().toISOString(), sourceCount: 0, items: fallbackTips(), note: '외부 RSS 호출이 실패해 내장 팁으로 대체했습니다.' });
  }
}
