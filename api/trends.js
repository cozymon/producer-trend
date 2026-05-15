const COUNTRY = {
  global: 'us',
  us: 'us',
  jp: 'jp',
  kr: 'kr'
};

const MARKET_TERMS = {
  us: ['electronic pop', 'pluggnb', 'afro pop', 'alt rock pop'],
  jp: ['anime song', 'jpop idol', 'vocaloid', 'city pop'],
  kr: ['kpop idol', 'k drama ost', 'korean ost', 'kpop dance']
};

const BASE_TRENDS = {
  global: [
    trend('Electronic Pop', '일렉트로닉 팝', 91, 93, '120–130', ['house kick','club bass','chopped vocal','glossy synth'], ['glossy','night','confident','festival'], '댄스 리듬이 팝/알앤비/아이돌 음악으로 흡수되는 글로벌 흐름.'),
    trend('Anime-influenced Band Pop', '애니메이션 밴드 팝', 88, 91, '145–178', ['bright guitar','fast drums','piano lift','big chorus'], ['youthful','bittersweet','dramatic','hopeful'], '강한 멜로디와 밴드 에너지가 결합된 오프닝 테마형 사운드.'),
    trend('PluggnB / Melodic Rap', '플러그앤비 / 멜로딕 랩', 86, 88, '140–160', ['soft 808','bell synth','dreamy keys','rolling hats'], ['dreamy','sad','cute','flex'], '싱잉랩, 아이돌 랩 파트, 숏폼 훅에 쓰기 좋은 인터넷 기반 사운드.'),
    trend('Organic Acoustic Pop', '어쿠스틱 팝', 79, 82, '78–105', ['acoustic guitar','room vocal','soft percussion','warm pad'], ['intimate','honest','nostalgic','human'], '과하게 전자적인 음악의 반대편에서 인간적인 질감으로 살아나는 흐름.')
  ],
  us: [
    trend('Electronic Pop', '일렉트로닉 팝', 94, 94, '120–132', ['4-on-floor','techno lead','vocal chop','sidechain pad'], ['club','glossy','late night','confident'], '미국/글로벌 팝에서 에너지와 대중성을 동시에 잡기 좋은 핵심 라인.'),
    trend('PluggnB', '플러그앤비', 88, 88, '145–160', ['bell pluck','soft 808','airy pad','rolling hats'], ['dreamy','melodic','internet','sad flex'], '멜로딕 랩과 아이돌식 싱잉랩에 적용하기 좋은 사운드.'),
    trend('Afro-pop Fusion', '아프로팝 퓨전', 84, 86, '95–115', ['afro percussion','warm bass','chant hook','soft synth'], ['warm','global','danceable','sunset'], '글로벌 리듬을 팝 작법과 섞을 때 강한 확장성을 가진 라인.'),
    trend('Alt-Rock Pop Revival', '얼트록 팝 리바이벌', 81, 81, '110–160', ['live guitar','punchy drums','distorted bass','anthem hook'], ['youth','angst','nostalgia','arena'], '기타와 밴드 에너지가 다시 팝 구조 안으로 들어오는 흐름.')
  ],
  jp: [
    trend('Anime Pop', '애니메이션 팝', 96, 95, '150–180', ['bright guitar','fast drums','piano','orchestral lift'], ['dramatic','hopeful','bittersweet','youthful'], '일본 시장에서 멜로디 중심, 캐릭터성, OST성이 가장 강하게 작동하는 라인.'),
    trend('Idol Band Pop', '아이돌 밴드 팝', 88, 90, '135–170', ['clean guitar','live drums','sparkle synth','group chant'], ['cute','bright','school','memory'], '귀여움과 감정선을 동시에 가진 아이돌/밴드 하이브리드.'),
    trend('Vocaloid / Utaite-core', '보컬로이드 / 우타이테 코어', 85, 82, '150–190', ['fast arp','digital piano','tight drums','pitch detail'], ['chaotic','clever','digital','expressive'], '탑라인과 캐릭터성이 사운드보다 더 중요해지는 디지털 작법.'),
    trend('Neo City Pop', '네오 시티팝', 76, 75, '90–115', ['funk guitar','analog keys','warm bass','soft drums'], ['urban','romantic','nostalgic','soft night'], '복고 자체보다 현대적 드럼/보컬과 결합할 때 유효한 라인.')
  ],
  kr: [
    trend('Idol House / Dance K-pop', '아이돌 하우스 / 댄스 케이팝', 94, 96, '122–128', ['house kick','pluck bass','clean clap','glossy synth'], ['runway','luxury','night','confident'], '아이돌 솔로, 그룹 컴백, 퍼포먼스 트랙에서 가장 활용도가 높은 댄스 팝 라인.', 'idol'),
    trend('Idol Easy R&B / Pop', '아이돌 이지 R&B / 팝', 86, 85, '85–105', ['soft drums','warm pad','minimal bass','airy vocal'], ['daily','chill','intimate','clean'], '부드러운 아이돌 보컬과 미니멀한 리듬으로 글로벌 청취에 맞는 라인.', 'idol'),
    trend('K-Drama OST Ballad Pop', '드라마 OST 발라드 팝', 89, 91, '65–90', ['piano','string pad','emotional vocal','soft snare'], ['sad','romantic','cinematic','memory'], '한국 시장에서 꾸준히 강한 OST형 발라드. 보컬 감정선과 후렴 멜로디가 핵심.', 'ost'),
    trend('K-Drama OST Band / Acoustic', '드라마 OST 밴드 / 어쿠스틱', 84, 88, '80–120', ['clean guitar','live drums','warm vocal','room reverb'], ['nostalgic','youth','healing','bittersweet'], '청춘물/로맨스 드라마에 잘 맞는 밴드/어쿠스틱 OST 라인.', 'ost')
  ]
};

function trend(genre, koGenre, heat, opportunity, bpm, sounds, vibes, brief, focus='general') {
  return { genre, koGenre, heat, opportunity, momentum: heat >= 90 ? 'Exploding' : heat >= 84 ? 'Rising' : heat >= 78 ? 'Warming' : 'Stable', bpm, sounds, vibes, brief, focus, tracks: [] };
}

function youtubeSearchUrl(artist, title, extra='official audio music video') {
  const q = `${artist || ''} ${title || ''} ${extra}`.trim();
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

async function fetchJson(url, timeoutMs = 5500) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'user-agent': 'ProducerTrendRadar/1.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function appleTopSongs(country) {
  const url = `https://rss.marketingtools.apple.com/api/v2/${country}/music/most-played/50/songs.json`;
  const json = await fetchJson(url);
  const results = json?.feed?.results || [];
  return results.map((x, idx) => ({
    rank: idx + 1,
    title: x.name,
    artist: x.artistName,
    artwork: x.artworkUrl100,
    appleUrl: x.url,
    releaseDate: x.releaseDate,
    source: 'Apple Music Most Played',
    youtubeUrl: youtubeSearchUrl(x.artistName, x.name)
  }));
}

async function itunesSearch(country, term, limit = 8) {
  const url = `https://itunes.apple.com/search?country=${country.toUpperCase()}&media=music&entity=song&limit=${limit}&term=${encodeURIComponent(term)}`;
  const json = await fetchJson(url, 4500);
  return (json.results || []).map((x, idx) => ({
    rank: idx + 1,
    title: x.trackName,
    artist: x.artistName,
    artwork: x.artworkUrl100,
    appleUrl: x.trackViewUrl,
    releaseDate: x.releaseDate ? String(x.releaseDate).slice(0,10) : '',
    source: 'iTunes Search',
    youtubeUrl: youtubeSearchUrl(x.artistName, x.trackName)
  }));
}

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

function attachTracks(trends, topSongs, market, searchBundles) {
  const used = new Set();
  const pools = searchBundles.flat();
  return trends.map((tr, idx) => {
    let candidates = [];
    const g = tr.genre.toLowerCase();
    if (market === 'kr') {
      if (tr.focus === 'ost') candidates = pools.filter(t => /ost|드라마|original|soundtrack/i.test(`${t.title} ${t.artist}`));
      if (tr.focus === 'idol') candidates = topSongs.slice(0, 25);
    } else if (g.includes('anime') || g.includes('vocaloid') || g.includes('idol')) {
      candidates = pools.concat(topSongs).filter(t => /anime|opening|idol|utaite|vocaloid|j-pop|jpop/i.test(`${t.title} ${t.artist} ${t.source}`));
    } else {
      candidates = topSongs.concat(pools);
    }
    if (candidates.length < 3) candidates = topSongs.concat(pools);
    const selected = [];
    for (const t of candidates) {
      const key = `${t.artist}-${t.title}`.toLowerCase();
      if (!used.has(key) && t.title && t.artist) {
        used.add(key);
        selected.push(t);
      }
      if (selected.length >= 4) break;
    }
    if (selected.length < 3) selected.push(...fallbackTracks(market, tr.genre).slice(0, 4 - selected.length));
    return { ...tr, heat: Math.min(99, tr.heat + Math.max(0, 4 - idx)), tracks: selected.slice(0,4) };
  });
}

function fallbackTracks(market, genre) {
  const presets = {
    kr: [['K-pop idol official','latest kpop comeback'], ['K-drama OST official','latest korean drama ost'], ['Korean band OST','kdrama band ost']],
    jp: [['Anime opening official','latest anime opening'], ['J-pop idol official','latest jpop idol'], ['Vocaloid new song','latest vocaloid song']],
    us: [['Electronic pop official','latest electronic pop'], ['PluggnB official','latest pluggnb'], ['Afropop official','latest afropop']],
    global: [['Global pop official','latest pop song'], ['Electronic pop official','latest dance pop'], ['Anime pop official','latest anime pop']]
  };
  return (presets[market] || presets.global).map(([artist,title],i)=>({rank:i+1,title,artist,artwork:'',appleUrl:'',releaseDate:'',source:'Fallback YouTube Search',youtubeUrl:`https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`}));
}

export default async function handler(req, res) {
  const market = String(req.query.market || 'global').toLowerCase();
  const safeMarket = BASE_TRENDS[market] ? market : 'global';
  const country = COUNTRY[safeMarket] || 'us';
  let topSongs = [];
  let searchBundles = [];
  let liveOk = false;

  try {
    topSongs = await appleTopSongs(country);
    const terms = MARKET_TERMS[safeMarket] || MARKET_TERMS.us;
    searchBundles = await Promise.all(terms.map(term => itunesSearch(country, term, 6).catch(() => [])));
    liveOk = topSongs.length > 0;
  } catch (e) {
    topSongs = fallbackTracks(safeMarket, 'fallback');
    searchBundles = [];
  }

  const trends = attachTracks(clone(BASE_TRENDS[safeMarket]), topSongs, safeMarket, searchBundles);
  const allTracks = topSongs.slice(0, 12).map((x, i) => ({...x, rank: i+1}));

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  res.status(200).json({
    market: safeMarket,
    country,
    liveOk,
    updatedAt: new Date().toISOString(),
    dataSource: liveOk ? 'Apple Music RSS Most Played + iTunes Search API' : 'Fallback seed data',
    note: 'Apple RSS는 현재 많이 재생되는 곡 기반입니다. YouTube는 API 없이 검색 링크로 연결됩니다.',
    trends,
    topTracks: allTracks
  });
}
