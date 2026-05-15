const FEEDS = [
  { source: 'LANDR Blog', url: 'https://blog.landr.com/feed/', type: 'Music Production' },
  { source: 'Bedroom Producers Blog', url: 'https://bedroomproducersblog.com/feed/', type: 'Free Plugins / Production' },
  { source: 'MusicTech', url: 'https://musictech.com/feed/', type: 'Music Technology' },
  { source: 'Attack Magazine', url: 'https://www.attackmagazine.com/feed/', type: 'Electronic / Sound Design' },
  { source: 'Produce Like A Pro', url: 'https://producelikeapro.com/blog/feed/', type: 'Mixing / Recording' },
  { source: 'Tracklib Blog', url: 'https://www.tracklib.com/blog/rss.xml', type: 'Sampling / Business' }
];

const TYPE_KO = {
  'Music Production': '음악 제작',
  'Free Plugins / Production': '무료 플러그인 / 제작',
  'Music Technology': '뮤직 테크',
  'Electronic / Sound Design': '일렉트로닉 / 사운드 디자인',
  'Mixing / Recording': '믹싱 / 레코딩',
  'Sampling / Business': '샘플링 / 비즈니스'
};

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
    return {
      source: feed.source,
      type: feed.type,
      typeKo: TYPE_KO[feed.type] || feed.type,
      title,
      summary: summary.slice(0, 360),
      url: link,
      publishedAt
    };
  }).filter(x => x.title && x.url);
}

async function fetchWithTimeout(url, timeout = 8000, options = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...options,
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 ProducerTrendRadar/1.0',
        ...(options.headers || {})
      }
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return res;
  } finally {
    clearTimeout(timer);
  }
}

function hasHangul(text = '') {
  return /[가-힣]/.test(text);
}

function polishKo(text = '') {
  return stripHtml(text)
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

async function googleTranslateKo(text) {
  const clean = stripHtml(text).slice(0, 900);
  if (!clean) return '';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(clean)}`;
  const res = await fetchWithTimeout(url, 6500);
  const json = await res.json();
  const translated = Array.isArray(json?.[0]) ? json[0].map(part => part?.[0] || '').join('') : '';
  return polishKo(translated);
}

async function myMemoryTranslateKo(text) {
  const clean = stripHtml(text).slice(0, 480);
  if (!clean) return '';
  const url = `https://api.mymemory.translated.net/get?langpair=en|ko&q=${encodeURIComponent(clean)}`;
  const res = await fetchWithTimeout(url, 6500);
  const json = await res.json();
  const out = json?.responseData?.translatedText || '';
  return polishKo(out);
}

function localKoSummary(item) {
  const type = item.typeKo || TYPE_KO[item.type] || '음악 제작';
  const title = item.title || '프로듀서 인사이트';
  const lower = `${item.title} ${item.summary} ${item.type}`.toLowerCase();
  let angle = '해외 음악 제작 커뮤니티에서 주목할 만한 최신 글입니다.';
  if (/plugin|vst|synth|instrument|free/.test(lower)) angle = '새로운 플러그인, 신스, 무료 제작 도구 흐름을 확인할 수 있는 글입니다.';
  else if (/mix|master|vocal|recording|studio/.test(lower)) angle = '믹싱, 레코딩, 보컬 처리, 스튜디오 워크플로우에 참고할 만한 글입니다.';
  else if (/sample|sampling|copyright|royalty|clearance/.test(lower)) angle = '샘플링과 저작권, 비즈니스 관점에서 참고할 만한 글입니다.';
  else if (/beat|drum|bass|sound design|electronic/.test(lower)) angle = '비트메이킹과 사운드 디자인 관점에서 참고할 만한 글입니다.';
  else if (/ai|technology|tool/.test(lower)) angle = 'AI와 음악 기술 변화가 제작 방식에 주는 힌트를 볼 수 있는 글입니다.';
  return {
    titleKo: `[${type}] ${title}`,
    summaryKo: angle
  };
}

async function translateKo(text, itemForFallback) {
  const clean = stripHtml(text);
  if (!clean) return '';
  if (hasHangul(clean)) return clean;
  try {
    const out = await googleTranslateKo(clean);
    if (out && hasHangul(out) && out.toLowerCase() !== clean.toLowerCase()) return out;
  } catch (e) {}
  try {
    const out = await myMemoryTranslateKo(clean);
    if (out && hasHangul(out) && !/INVALID|QUERY LENGTH/i.test(out) && out.toLowerCase() !== clean.toLowerCase()) return out;
  } catch (e) {}
  if (itemForFallback) {
    const local = localKoSummary(itemForFallback);
    if (clean === itemForFallback.title) return local.titleKo;
    return local.summaryKo;
  }
  return clean;
}

function fallbackTips() {
  return [
    {
      source: 'Fallback Tip DB', type: 'A&R / Demo', typeKo: 'A&R / 데모', title: 'Make the hook obvious in the first minute',
      titleKo: '1분 안에 훅의 정체성이 보여야 합니다',
      summary: 'A&R listeners often decide quickly. Prove the hook, the vocal tone, and the target market before over-arranging the demo.',
      summaryKo: '기획사 A&R은 빠르게 판단하는 경우가 많습니다. 데모를 과하게 편곡하기 전에 훅, 보컬 톤, 타깃 시장을 먼저 증명하세요.',
      url: '', publishedAt: new Date().toISOString()
    },
    {
      source: 'Fallback Tip DB', type: 'Mixing', typeKo: '믹싱', title: 'If the chorus feels small, reduce the verse first',
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
      const response = await fetchWithTimeout(feed.url);
      const xml = await response.text();
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
      const titleKo = await translateKo(item.title, item);
      const summaryKo = await translateKo(item.summary, item);
      translated.push({ ...item, titleKo, summaryKo, translationMode: hasHangul(titleKo + summaryKo) ? 'ko' : 'fallback' });
    }

    const finalItems = translated.length ? translated : fallbackTips();
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    res.status(200).json({
      updatedAt: new Date().toISOString(),
      sourceCount: FEEDS.length,
      items: finalItems,
      note: '해외 프로듀서 정보 RSS를 가져와 서버에서 한국어 번역을 시도합니다. 번역 API가 막히면 한국어 요약 fallback을 표시합니다.'
    });
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800');
    res.status(200).json({ updatedAt: new Date().toISOString(), sourceCount: 0, items: fallbackTips(), note: '외부 RSS 호출이 실패해 내장 팁으로 대체했습니다.' });
  }
}
