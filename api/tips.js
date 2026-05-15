const FEEDS = [
  { source: 'Sound On Sound', url: 'https://www.soundonsound.com/news/sosrssfeed.php', type: 'Production / Recording' },
  { source: 'MusicTech', url: 'https://musictech.com/feed/', type: 'Music Technology / Production' },
  { source: 'Attack Magazine', url: 'https://www.attackmagazine.com/feed/', type: 'Electronic / Sound Design' },
  { source: 'Splice Blog', url: 'https://splice.com/blog/feed/', type: 'Production / Songwriting' }
];

const TYPE_KO = {
  'Production / Recording': '제작 / 레코딩',
  'Music Technology / Production': '뮤직 테크 / 제작',
  'Electronic / Sound Design': '일렉트로닉 / 사운드 디자인',
  'Production / Songwriting': '제작 / 송라이팅'
};

const INCLUDE_KEYWORDS = [
  'production', 'producer', 'producing', 'mixing', 'mix', 'mastering', 'master', 'sound design',
  'songwriting', 'arrangement', 'arranging', 'vocal', 'drums', 'drum', 'bass', 'synth',
  'workflow', 'studio', 'behind the track', 'how to', 'tutorial', 'recording', 'engineer',
  'beat', 'beats', 'sample', 'sampling', 'creative process', 'track breakdown', 'song', 'songs'
];

const EXCLUDE_KEYWORDS = [
  'discount', 'sale', 'coupon', 'deal', 'giveaway', 'free plugin', 'bundle',
  'black friday', 'cyber monday', 'save ', '% off', 'limited time', 'plugin boutique'
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

function classifyCategory(item) {
  const text = `${item.title} ${item.summary} ${item.type}`.toLowerCase();
  if (/behind the track|track breakdown|interview|creative process|making of|deconstructed/.test(text)) return { category: 'behind', categoryKo: '제작기' };
  if (/sound design|synth|bass|drum|beat|sample|sampling|texture|808|kick|snare/.test(text)) return { category: 'sound', categoryKo: '사운드 디자인' };
  if (/mix|mixing|master|mastering|eq|compress|limiter|reverb|delay|engineer/.test(text)) return { category: 'mix', categoryKo: '믹싱/마스터링' };
  if (/songwriting|arrangement|arranging|chord|melody|lyrics|composition|topline/.test(text)) return { category: 'songwriting', categoryKo: '송라이팅/편곡' };
  if (/vocal|voice|singer|topline/.test(text)) return { category: 'vocal', categoryKo: '보컬' };
  if (/workflow|studio|setup|recording|session|template/.test(text)) return { category: 'workflow', categoryKo: '워크플로우' };
  return { category: 'workflow', categoryKo: '워크플로우' };
}

function isUsefulProducerTip(item) {
  const text = `${item.title} ${item.summary} ${item.type}`.toLowerCase();
  if (!item.title || !item.url) return false;
  if (EXCLUDE_KEYWORDS.some(k => text.includes(k))) return false;
  return INCLUDE_KEYWORDS.some(k => text.includes(k));
}

function parseFeed(xml, feed) {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  return blocks.slice(0, 14).map((block) => {
    let link = tag(block, 'link');
    if (!link) link = attrTag(block, 'link', 'href');
    const title = tag(block, 'title');
    const summary = tag(block, 'description') || tag(block, 'summary') || tag(block, 'content:encoded');
    const publishedAt = tag(block, 'pubDate') || tag(block, 'updated') || tag(block, 'published');
    const base = {
      source: feed.source,
      type: feed.type,
      typeKo: TYPE_KO[feed.type] || feed.type,
      title,
      summary: summary.slice(0, 420),
      url: link,
      publishedAt
    };
    return { ...base, ...classifyCategory(base) };
  }).filter(isUsefulProducerTip);
}

async function fetchWithTimeout(url, timeout = 8000, options = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...options,
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 ProducerTrendRadar/3.5',
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
  const cat = item.categoryKo || '프로듀서 팁';
  const title = item.title || '프로듀서 인사이트';
  const lower = `${item.title} ${item.summary} ${item.type}`.toLowerCase();
  let angle = '해외 메이저 음악 제작 매체에서 가져온 프로듀서용 실전 인사이트입니다.';
  if (/behind the track|track breakdown|creative process|making of/.test(lower)) angle = '실제 곡이 어떤 제작 의도와 사운드 선택으로 완성됐는지 참고할 수 있는 제작기입니다.';
  else if (/mix|master|eq|compress|vocal|recording|studio/.test(lower)) angle = '믹싱, 마스터링, 보컬 처리, 레코딩 워크플로우에 참고할 만한 글입니다.';
  else if (/sound design|synth|drum|bass|sample|sampling|beat/.test(lower)) angle = '사운드 디자인, 비트메이킹, 신스/드럼 톤 설계에 힌트를 줄 수 있는 글입니다.';
  else if (/songwriting|arrangement|melody|chord|lyrics|topline/.test(lower)) angle = '송라이팅, 편곡, 멜로디/코드 구성에 참고할 만한 글입니다.';
  else if (/workflow|session|template|setup/.test(lower)) angle = '작업 속도와 완성도를 높이는 스튜디오/세션 워크플로우 관점의 글입니다.';
  return {
    titleKo: `[${cat}] ${title}`,
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
  const now = new Date().toISOString();
  return [
    {
      source: 'Producer Tip DB', type: 'A&R / Demo', typeKo: 'A&R / 데모', category: 'behind', categoryKo: '제작기', title: 'Make the hook obvious in the first minute',
      titleKo: '1분 안에 훅의 정체성이 보여야 합니다',
      summary: 'A&R listeners often decide quickly. Prove the hook, the vocal tone, and the target market before over-arranging the demo.',
      summaryKo: '기획사 A&R은 빠르게 판단하는 경우가 많습니다. 데모를 과하게 편곡하기 전에 훅, 보컬 톤, 타깃 시장을 먼저 증명하세요.',
      url: '', publishedAt: now
    },
    {
      source: 'Producer Tip DB', type: 'Mixing', typeKo: '믹싱', category: 'mix', categoryKo: '믹싱/마스터링', title: 'If the chorus feels small, reduce the verse first',
      titleKo: '후렴이 작게 느껴지면 먼저 벌스를 줄여보세요',
      summary: 'Contrast often creates impact more effectively than adding more layers.',
      summaryKo: '악기를 더 얹는 것보다 벌스의 에너지를 줄여 대비를 만드는 편이 더 강한 임팩트를 줄 때가 많습니다.',
      url: '', publishedAt: now
    },
    {
      source: 'Producer Tip DB', type: 'Workflow', typeKo: '워크플로우', category: 'workflow', categoryKo: '워크플로우', title: 'Build a demo template before inspiration arrives',
      titleKo: '영감이 오기 전에 데모 템플릿을 만들어두세요',
      summary: 'A ready session template keeps the first idea from dying while you route tracks and choose basic sounds.',
      summaryKo: '세션 템플릿이 준비되어 있으면 라우팅과 기본 사운드 선택 때문에 첫 아이디어가 식는 일을 줄일 수 있습니다.',
      url: '', publishedAt: now
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
    }).slice(0, 24);

    const translated = [];
    for (const item of items.slice(0, 18)) {
      const titleKo = await translateKo(item.title, item);
      const summaryKo = await translateKo(item.summary, item);
      translated.push({ ...item, titleKo, summaryKo, translationMode: hasHangul(titleKo + summaryKo) ? 'ko' : 'fallback' });
    }

    const finalItems = translated.length ? translated : fallbackTips();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    res.status(200).json({
      updatedAt: new Date().toISOString(),
      sourceCount: FEEDS.length,
      sources: FEEDS.map(f => f.source),
      items: finalItems,
      note: 'v3.5: Sound On Sound, MusicTech, Attack Magazine, Splice Blog 중심으로 제작기/사운드 디자인/믹싱/송라이팅 글만 선별합니다. 플러그인 할인/번들 뉴스는 제외합니다.'
    });
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800');
    res.status(200).json({ updatedAt: new Date().toISOString(), sourceCount: 0, sources: [], items: fallbackTips(), note: '외부 RSS 호출이 실패해 내장 팁으로 대체했습니다.' });
  }
}
