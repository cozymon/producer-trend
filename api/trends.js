const COUNTRY = {
  global: 'us',
  us: 'us',
  jp: 'jp',
  kr: 'kr'
};

const BASE_TRENDS = {
  global: [
    trend('Electronic Pop', '일렉트로닉 팝', 92, 93, '120–132', ['house kick','club bass','chopped vocal','glossy synth'], ['glossy','night','confident','festival'], '댄스 리듬이 팝/알앤비/아이돌 음악으로 흡수되는 글로벌 흐름.', 'general', ['electronic pop 2026','dance pop','house pop','club pop','electro pop']),
    trend('Anime-influenced Band Pop', '애니메이션 밴드 팝', 89, 91, '145–178', ['bright guitar','fast drums','piano lift','big chorus'], ['youthful','bittersweet','dramatic','hopeful'], '강한 멜로디와 밴드 에너지가 결합된 오프닝 테마형 사운드.', 'general', ['anime opening','anime song','j-rock anime','jpop band','anisong']),
    trend('PluggnB / Melodic Rap', '플러그앤비 / 멜로딕 랩', 87, 88, '140–160', ['soft 808','bell synth','dreamy keys','rolling hats'], ['dreamy','sad','cute','flex'], '싱잉랩, 아이돌 랩 파트, 숏폼 훅에 쓰기 좋은 인터넷 기반 사운드.', 'general', ['pluggnb','melodic rap','rage rap','internet rap','new wave rap']),
    trend('Organic Acoustic Pop', '어쿠스틱 팝', 80, 83, '78–105', ['acoustic guitar','room vocal','soft percussion','warm pad'], ['intimate','honest','nostalgic','human'], '과하게 전자적인 음악의 반대편에서 인간적인 질감으로 살아나는 흐름.', 'general', ['acoustic pop','singer songwriter','indie folk pop','organic pop','soft pop'])
  ],
  us: [
    trend('Electronic Pop', '일렉트로닉 팝', 95, 94, '120–132', ['4-on-floor','techno lead','vocal chop','sidechain pad'], ['club','glossy','late night','confident'], '미국/글로벌 팝에서 에너지와 대중성을 동시에 잡기 좋은 핵심 라인.', 'club', ['electronic pop 2026','dance pop','house pop','club pop','techno pop']),
    trend('PluggnB', '플러그앤비', 88, 88, '145–160', ['bell pluck','soft 808','airy pad','rolling hats'], ['dreamy','melodic','internet','sad flex'], '멜로딕 랩과 아이돌식 싱잉랩에 적용하기 좋은 사운드.', 'rap', ['pluggnb','melodic rap','new wave rap','rage rap','underground rap']),
    trend('Afro-pop Fusion', '아프로팝 퓨전', 84, 86, '95–115', ['afro percussion','warm bass','chant hook','soft synth'], ['warm','global','danceable','sunset'], '글로벌 리듬을 팝 작법과 섞을 때 강한 확장성을 가진 라인.', 'global', ['afrobeats','afro pop','amapiano pop','afro fusion','global pop']),
    trend('Alt-Rock Pop Revival', '얼트록 팝 리바이벌', 82, 81, '110–160', ['live guitar','punchy drums','distorted bass','anthem hook'], ['youth','angst','nostalgia','arena'], '기타와 밴드 에너지가 다시 팝 구조 안으로 들어오는 흐름.', 'band', ['alt rock pop','pop rock','indie rock pop','alternative pop','guitar pop'])
  ],
  jp: [
    trend('Anime Pop', '애니메이션 팝', 96, 95, '150–180', ['bright guitar','fast drums','piano','orchestral lift'], ['dramatic','hopeful','bittersweet','youthful'], '일본 시장에서 멜로디 중심, 캐릭터성, OST성이 가장 강하게 작동하는 라인.', 'anime', ['anime opening','anime song','anisong','jpop anime','anime ending']),
    trend('Idol Band Pop', '아이돌 밴드 팝', 88, 90, '135–170', ['clean guitar','live drums','sparkle synth','group chant'], ['cute','bright','school','memory'], '귀여움과 감정선을 동시에 가진 아이돌/밴드 하이브리드.', 'idol', ['jpop idol','japanese idol','idol pop japan','jpop band idol','japanese girl group']),
    trend('Vocaloid / Utaite-core', '보컬로이드 / 우타이테 코어', 85, 82, '150–190', ['fast arp','digital piano','tight drums','pitch detail'], ['chaotic','clever','digital','expressive'], '탑라인과 캐릭터성이 사운드보다 더 중요해지는 디지털 작법.', 'digital', ['vocaloid','utaite','hatsune miku','japanese internet music','vocaloid song']),
    trend('Neo City Pop', '네오 시티팝', 77, 76, '90–115', ['funk guitar','analog keys','warm bass','soft drums'], ['urban','romantic','nostalgic','soft night'], '복고 자체보다 현대적 드럼/보컬과 결합할 때 유효한 라인.', 'retro', ['city pop','neo city pop','japanese city pop','jpop funk','retro pop japan'])
  ],
  kr: [
    trend('Idol House / Dance K-pop', '아이돌 하우스 / 댄스 케이팝', 95, 96, '122–128', ['house kick','pluck bass','clean clap','glossy synth'], ['runway','luxury','night','confident'], '아이돌 솔로, 그룹 컴백, 퍼포먼스 트랙에서 가장 활용도가 높은 댄스 팝 라인.', 'idol-dance', ['kpop dance','kpop idol','kpop comeback','korean girl group','korean boy group','kpop house']),
    trend('Idol Easy R&B / Pop', '아이돌 이지 R&B / 팝', 87, 86, '85–110', ['soft drums','warm pad','minimal bass','airy vocal'], ['daily','chill','intimate','clean'], '부드러운 아이돌 보컬과 미니멀한 리듬으로 글로벌 청취에 맞는 라인.', 'idol-rnb', ['kpop r&b','kpop pop','korean idol r&b','korean pop chill','kpop easy listening']),
    trend('K-Drama OST Ballad Pop', '드라마 OST 발라드 팝', 90, 92, '65–90', ['piano','string pad','emotional vocal','soft snare'], ['sad','romantic','cinematic','memory'], '한국 시장에서 꾸준히 강한 OST형 발라드. 보컬 감정선과 후렴 멜로디가 핵심.', 'ost-ballad', ['k drama ost','korean drama ost','original soundtrack korean drama','kdrama ballad','korean ost ballad']),
    trend('K-Drama OST Band / Acoustic', '드라마 OST 밴드 / 어쿠스틱', 85, 89, '80–120', ['clean guitar','live drums','warm vocal','room reverb'], ['nostalgic','youth','healing','bittersweet'], '청춘물/로맨스 드라마에 잘 맞는 밴드/어쿠스틱 OST 라인.', 'ost-band', ['korean drama ost acoustic','kdrama band ost','korean acoustic ost','korean drama band','korean soundtrack guitar']),
    trend('K-indie / Band Pop', '케이인디 / 밴드팝', 84, 88, '90–145', ['clean guitar','live drums','warm vocal','room reverb'], ['nostalgic','honest','youth','healing'], '아이돌 차트와 별개로 글로벌 리스너에게 발견될 수 있는 한국 밴드/인디 팝 라인.', 'k-indie', ['korean indie','korean band','k-indie','korean band pop','korean indie pop'])
  ]
};

function trend(genre, koGenre, heat, opportunity, bpm, sounds, vibes, brief, focus='general', searchTerms=[]) {
  return { genre, koGenre, heat, opportunity, momentum: heat >= 90 ? 'Exploding' : heat >= 84 ? 'Rising' : heat >= 78 ? 'Warming' : 'Stable', bpm, sounds, vibes, brief, focus, searchTerms, tracks: [] };
}

function youtubeSearchUrl(artist, title, extra='official audio music video') {
  const q = `${artist || ''} ${title || ''} ${extra}`.trim();
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

async function fetchJson(url, timeoutMs = 6000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'user-agent': 'ProducerTrendRadar/2.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function appleTopSongs(country, count = 100) {
  const url = `https://rss.marketingtools.apple.com/api/v2/${country}/music/most-played/${count}/songs.json`;
  const json = await fetchJson(url);
  const results = json?.feed?.results || [];
  return results.map((x, idx) => normalizeTrack({
    rank: idx + 1,
    title: x.name,
    artist: x.artistName,
    artwork: x.artworkUrl100,
    appleUrl: x.url,
    releaseDate: x.releaseDate,
    album: x.collectionName || '',
    genres: (x.genres || []).map(g => g.name).filter(Boolean),
    source: 'Apple Music Most Played'
  }));
}

async function appleNewSongs(country, count = 50) {
  const url = `https://rss.marketingtools.apple.com/api/v2/${country}/music/new-releases/${count}/songs.json`;
  const json = await fetchJson(url);
  const results = json?.feed?.results || [];
  return results.map((x, idx) => normalizeTrack({
    rank: idx + 1,
    title: x.name,
    artist: x.artistName,
    artwork: x.artworkUrl100,
    appleUrl: x.url,
    releaseDate: x.releaseDate,
    album: x.collectionName || '',
    genres: (x.genres || []).map(g => g.name).filter(Boolean),
    source: 'Apple Music New Releases'
  }));
}

async function itunesSearch(country, term, limit = 18) {
  const url = `https://itunes.apple.com/search?country=${country.toUpperCase()}&media=music&entity=song&limit=${limit}&term=${encodeURIComponent(term)}`;
  const json = await fetchJson(url, 5000);
  return (json.results || []).map((x, idx) => normalizeTrack({
    rank: idx + 1,
    title: x.trackName,
    artist: x.artistName,
    artwork: x.artworkUrl100,
    appleUrl: x.trackViewUrl,
    releaseDate: x.releaseDate ? String(x.releaseDate).slice(0,10) : '',
    album: x.collectionName || '',
    genres: [x.primaryGenreName].filter(Boolean),
    source: `iTunes Search · ${term}`
  }));
}

function normalizeTrack(x) {
  const title = clean(x.title || '');
  const artist = clean(x.artist || '');
  return {
    ...x,
    title,
    artist,
    youtubeUrl: youtubeSearchUrl(artist, title),
    searchText: `${title} ${artist} ${x.album || ''} ${(x.genres || []).join(' ')} ${x.source || ''}`.toLowerCase()
  };
}

function clean(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

function uniqueTracks(list) {
  const seen = new Set();
  const out = [];
  for (const t of list) {
    if (!t || !t.title || !t.artist) continue;
    const key = `${t.artist}__${t.title}`.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out;
}

function recencyScore(date) {
  if (!date) return 0;
  const time = Date.parse(date);
  if (!Number.isFinite(time)) return 0;
  const days = (Date.now() - time) / 86400000;
  if (days < 0) return 3;
  if (days <= 90) return 18;
  if (days <= 365) return 12;
  if (days <= 730) return 6;
  return 0;
}

function matchScore(track, tr, market) {
  const txt = track.searchText || '';
  let score = 0;
  // Fresh public chart rank is important.
  if (track.source && track.source.includes('Most Played')) score += Math.max(0, 26 - Math.min(track.rank || 99, 25));
  if (track.source && track.source.includes('New Releases')) score += 18;
  score += recencyScore(track.releaseDate);

  for (const term of tr.searchTerms || []) {
    const words = term.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const hits = words.filter(w => txt.includes(w)).length;
    score += hits * 8;
  }

  const f = tr.focus;
  if (market === 'kr') {
    if (f.includes('idol')) {
      if (/k-?pop|kpop|idol|girl group|boy group|dance|pop/i.test(txt)) score += 24;
      if (/ost|soundtrack|drama|instrumental/i.test(txt)) score -= 22;
    }
    if (f.includes('ost')) {
      if (/ost|soundtrack|original|drama|드라마|part\.?\s*\d+/i.test(txt)) score += 36;
      if (/k-?pop|idol|girl group|boy group/i.test(txt)) score -= 8;
    }
    if (f === 'ost-band') {
      if (/band|acoustic|guitar|indie|rock/i.test(txt)) score += 14;
      if (/ballad|piano/i.test(txt)) score += 8;
    }
    if (f === 'k-indie') {
      if (/indie|band|rock|acoustic|folk/i.test(txt)) score += 28;
      if (/ost|soundtrack|drama/i.test(txt)) score -= 12;
    }
  }

  if (market === 'jp') {
    if (f === 'anime' && /anime|opening|ending|soundtrack|j-?pop|japanese/i.test(txt)) score += 24;
    if (f === 'idol' && /idol|j-?pop|girl group|boy group/i.test(txt)) score += 20;
    if (f === 'digital' && /vocaloid|utaite|miku|digital|anime/i.test(txt)) score += 24;
    if (f === 'retro' && /city pop|funk|retro|jazz|soul/i.test(txt)) score += 22;
  }

  if (market === 'us' || market === 'global') {
    if (f === 'club' && /dance|electronic|house|club|techno|edm|pop/i.test(txt)) score += 20;
    if (f === 'rap' && /rap|hip-hop|hip hop|plug|rage|trap/i.test(txt)) score += 20;
    if (f === 'global' && /afro|afrobeats|amapiano|world|latin|dance/i.test(txt)) score += 20;
    if (f === 'band' && /rock|alternative|indie|band|guitar/i.test(txt)) score += 20;
  }
  return score;
}

async function tracksForTrend(tr, country, market, commonPool) {
  const searches = await Promise.all((tr.searchTerms || []).slice(0, 6).map(term => itunesSearch(country, term, 18).catch(() => [])));
  const pool = uniqueTracks([...searches.flat(), ...commonPool]);
  const scored = pool
    .map(t => ({...t, _score: matchScore(t, tr, market)}))
    .sort((a, b) => b._score - a._score || (a.rank || 999) - (b.rank || 999));
  let selected = scored.filter(t => t._score > 8).slice(0, 15);
  if (selected.length < 10) {
    const filler = scored.filter(t => !selected.some(s => s.artist === t.artist && s.title === t.title));
    selected = uniqueTracks([...selected, ...filler]).slice(0, 15);
  }
  if (selected.length < 10) {
    selected = uniqueTracks([...selected, ...fallbackTracks(market, tr).slice(0, 10 - selected.length)]);
  }
  return selected.slice(0, 15).map((t, i) => ({...t, rank: i + 1, _score: undefined}));
}

function fallbackTracks(market, tr) {
  const terms = tr.searchTerms && tr.searchTerms.length ? tr.searchTerms : [tr.genre];
  return terms.slice(0, 12).map((term, i) => normalizeTrack({
    rank: i + 1,
    title: `Latest ${term}`,
    artist: market === 'kr' ? 'Korea Music Signal' : market === 'jp' ? 'Japan Music Signal' : 'Global Music Signal',
    artwork: '',
    appleUrl: '',
    releaseDate: '',
    genres: [],
    source: 'Fallback YouTube Search'
  }));
}

export default async function handler(req, res) {
  const market = String(req.query.market || 'global').toLowerCase();
  const safeMarket = BASE_TRENDS[market] ? market : 'global';
  const country = COUNTRY[safeMarket] || 'us';
  let topSongs = [];
  let newSongs = [];
  let liveOk = false;

  try {
    const [top, fresh] = await Promise.all([
      appleTopSongs(country, 100).catch(() => []),
      appleNewSongs(country, 50).catch(() => [])
    ]);
    topSongs = top;
    newSongs = fresh;
    liveOk = topSongs.length > 0 || newSongs.length > 0;
  } catch (e) {
    topSongs = [];
    newSongs = [];
  }

  const base = clone(BASE_TRENDS[safeMarket]);
  const commonPool = uniqueTracks([...newSongs, ...topSongs]);
  const trends = [];
  for (let i = 0; i < base.length; i++) {
    const tr = base[i];
    const tracks = await tracksForTrend(tr, country, safeMarket, commonPool).catch(() => fallbackTracks(safeMarket, tr));
    trends.push({ ...tr, heat: Math.min(99, tr.heat + Math.max(0, 3 - i)), tracks });
  }

  const liveSearchTerms = base.flatMap(t => t.searchTerms || []).slice(0, 10);
  const liveSearches = await Promise.all(liveSearchTerms.map(term => itunesSearch(country, term, 10).catch(() => [])));
  const allTracks = uniqueTracks([...newSongs, ...topSongs, ...liveSearches.flat()]).slice(0, 60).map((x, i) => ({...x, rank: i + 1}));

  res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=3600');
  res.status(200).json({
    market: safeMarket,
    country,
    liveOk,
    updatedAt: new Date().toISOString(),
    dataSource: liveOk ? 'Apple Music RSS Most Played/New Releases + iTunes Search API' : 'Fallback seed data',
    note: 'Apple Music 공개 RSS와 iTunes Search API를 조합합니다. YouTube는 API 없이 검색 링크로 연결됩니다. 장르 분류는 공개 메타데이터와 키워드 매칭 기반이라 일부 오차가 있을 수 있습니다.',
    trends,
    topTracks: allTracks
  });
}
