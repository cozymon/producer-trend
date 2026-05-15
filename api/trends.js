const COUNTRY = { global: 'us', us: 'us', jp: 'jp', kr: 'kr' };

function trend(genre, koGenre, heat, opportunity, bpm, sounds, vibes, brief, focus='general', searchTerms=[], pickupFit=70, alphaFit=55) {
  return { genre, koGenre, heat, opportunity, momentum: heat >= 92 ? 'Exploding' : heat >= 86 ? 'Rising' : heat >= 80 ? 'Warming' : 'Stable', bpm, sounds, vibes, brief, focus, searchTerms, pickupFit, alphaFit, tracks: [] };
}

const BASE_TRENDS = {
  global: [
    trend('Electronic Pop', '일렉트로닉 팝', 94, 92, '120–130', ['house kick','club bass','chopped vocal','glossy synth'], ['glossy','night','confident','festival'], '댄스 에너지와 팝 훅이 결합되는 글로벌 메인 라인. 짧고 반복 가능한 훅이 중요합니다.', 'club', ['electronic pop','dance pop','house pop','club pop','edm pop'], 90, 72),
    trend('Anime-influenced Band Pop', '애니 영향 밴드 팝', 89, 91, '145–178', ['bright guitar','fast drums','piano lift','big chorus'], ['youthful','bittersweet','dramatic','hopeful'], '일본/한국 양쪽에서 감정선과 멜로디가 강한 곡으로 확장 가능한 라인.', 'anime-band', ['anime pop','jpop rock','anime opening','band pop','japanese rock'], 88, 78),
    trend('PluggnB / Melodic Rap', '플러그앤비 / 멜로딕 랩', 86, 87, '140–160 / half-time', ['soft 808','bell synth','dreamy keys','rolling hats'], ['dreamy','sad','cute','flex'], '아이돌 랩 파트, 솔로 싱잉랩, 인터넷 감성 훅에 적용하기 좋은 라인.', 'rap', ['pluggnb','melodic rap','rage rap','internet rap','trap melodic'], 75, 82),
    trend('Organic Acoustic Pop', '오가닉 어쿠스틱 팝', 80, 82, '78–105', ['acoustic guitar','room vocal','soft percussion','warm pad'], ['intimate','honest','nostalgic','human'], '과도하게 전자적인 사운드와 대비되는 인간적인 질감의 감성 팝.', 'acoustic', ['acoustic pop','singer songwriter','folk pop','organic pop','soft pop'], 80, 68)
  ],
  us: [
    trend('Electronic Pop', '일렉트로닉 팝', 95, 93, '120–132', ['4-on-floor','techno lead','vocal chop','sidechain pad'], ['club','glossy','late night','confident'], '미국/글로벌 팝에서 에너지와 대중성을 동시에 가져가기 좋은 라인.', 'club', ['electronic pop','dance pop','house pop','club pop','techno pop'], 88, 74),
    trend('PluggnB', '플러그앤비', 89, 88, '145–160', ['bell pluck','soft 808','airy pad','rolling hats'], ['dreamy','melodic','internet','sad flex'], '멜로딕 랩과 아이돌식 싱잉랩 사이에서 활용도가 높은 인터넷 기반 사운드.', 'rap', ['pluggnb','melodic rap','rage rap','underground rap','trap melodic'], 72, 86),
    trend('Afro-pop Fusion', '아프로팝 퓨전', 84, 85, '95–115', ['afro percussion','warm bass','chant hook','soft synth'], ['warm','global','danceable','sunset'], '리듬 중심의 글로벌 팝 라인. 팝 송라이팅과 섞을 때 유효합니다.', 'global', ['afrobeats','afro pop','amapiano','global pop','dancehall pop'], 78, 80),
    trend('Alt-Rock Pop Revival', '얼트록 팝 리바이벌', 82, 81, '110–160', ['live guitar','punchy drums','distorted bass','anthem hook'], ['youth','angst','nostalgia','arena'], '기타 에너지와 팝 훅을 결합한 감정적 컴백/아티스트 포지셔닝 라인.', 'band', ['alt rock pop','pop rock','indie rock pop','alternative pop','guitar pop'], 82, 76)
  ],
  jp: [
    trend('Anime Pop', '애니 팝', 96, 95, '150–180', ['bright guitar','fast drums','piano','orchestral lift'], ['dramatic','hopeful','bittersweet','youthful'], '일본 시장에서 멜로디 중심, 캐릭터성, OST성이 가장 강하게 작동하는 라인.', 'anime', ['anime opening','anime song','anisong','jpop anime','anime ending'], 92, 74),
    trend('Idol Band Pop', '아이돌 밴드 팝', 88, 90, '135–170', ['clean guitar','live drums','sparkle synth','group chant'], ['cute','bright','school','memory'], '귀여움과 감정선을 동시에 가진 아이돌/밴드 하이브리드.', 'idol', ['jpop idol','japanese idol','idol pop japan','jpop band idol','japanese girl group'], 89, 76),
    trend('Vocaloid / Utaite-core', '보컬로이드 / 우타이테 코어', 85, 82, '150–190', ['fast arp','digital piano','tight drums','pitch detail'], ['chaotic','clever','digital','expressive'], '탑라인과 캐릭터성이 사운드보다 더 중요해지는 디지털 작법.', 'digital', ['vocaloid','utaite','hatsune miku','japanese internet music','vocaloid song'], 67, 90),
    trend('Neo City Pop', '네오 시티팝', 77, 76, '90–115', ['funk guitar','analog keys','warm bass','soft drums'], ['urban','romantic','nostalgic','soft night'], '복고 자체보다 현대적 드럼/보컬과 결합할 때 유효한 라인.', 'retro', ['city pop','neo city pop','japanese city pop','jpop funk','retro pop japan'], 72, 62)
  ],
  kr: [
    trend('Idol Title Dance / House K-pop', '아이돌 타이틀 댄스 / 하우스 케이팝', 96, 97, '122–128', ['house kick','pluck bass','clean clap','glossy synth'], ['runway','luxury','night','confident'], '기획사 타이틀/퍼포먼스 후보로 가장 직접적인 라인. 인트로 5초, 후렴 훅, 챌린지 포인트가 핵심입니다.', 'idol-title', ['kpop dance','kpop idol','kpop comeback','korean girl group','korean boy group','kpop house','kpop title'], 96, 72),
    trend('Idol B-side Easy R&B / Pop', '아이돌 수록곡 이지 R&B / 팝', 88, 90, '85–110', ['soft drums','warm pad','minimal bass','airy vocal'], ['daily','chill','intimate','clean'], '팬덤 만족도와 글로벌 플레이리스트에 맞는 수록곡 라인. 보컬 합과 미니멀 그루브가 중요합니다.', 'idol-bside', ['kpop r&b','kpop b side','korean idol r&b','korean pop chill','kpop easy listening'], 91, 68),
    trend('K-Drama OST Ballad Pop', '드라마 OST 발라드 팝', 91, 93, '65–90', ['piano','string pad','emotional vocal','soft snare'], ['sad','romantic','cinematic','memory'], '한국 시장에서 꾸준히 강한 OST형 발라드. 보컬 감정선과 후렴 멜로디가 핵심입니다.', 'ost-ballad', ['k drama ost','korean drama ost','original soundtrack korean drama','kdrama ballad','korean ost ballad'], 94, 60),
    trend('K-Drama OST Band / Acoustic', '드라마 OST 밴드 / 어쿠스틱', 86, 90, '80–120', ['clean guitar','live drums','warm vocal','room reverb'], ['nostalgic','youth','healing','bittersweet'], '청춘물/로맨스 드라마에 잘 맞는 밴드/어쿠스틱 OST 라인. 따뜻한 기타와 후렴 리프트가 중요합니다.', 'ost-band', ['korean drama ost acoustic','kdrama band ost','korean acoustic ost','korean drama band','korean soundtrack guitar'], 90, 72),
    trend('K-indie / Band Pop', '케이인디 / 밴드팝', 84, 88, '90–145', ['clean guitar','live drums','warm vocal','room reverb'], ['nostalgic','honest','youth','healing'], '아이돌 차트와 별개로 글로벌 리스너에게 발견될 수 있는 한국 밴드/인디 팝 라인.', 'k-indie', ['korean indie','korean band','k-indie','korean band pop','korean indie pop'], 78, 86),
    trend('Short-form Hook Pop', '숏폼 훅 팝', 82, 87, '95–150', ['vocal chop','tight drums','minimal bass','hook loop'], ['cute','internet','catchy','fast'], '10초 안에 기억되는 훅과 캐릭터 있는 사운드가 중요한 바이럴 후보 라인.', 'shortform', ['kpop challenge','viral kpop','korean viral song','tiktok kpop','short form music korea'], 86, 91)
  ]
};

function youtubeSearchUrl(artist, title, extra='official audio music video') {
  const q = `${artist || ''} ${title || ''} ${extra}`.trim();
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}
async function fetchJson(url, timeoutMs = 6500) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'user-agent': 'ProducerTrendRadar/3.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally { clearTimeout(t); }
}
async function appleTopSongs(country, count = 100) {
  const url = `https://rss.marketingtools.apple.com/api/v2/${country}/music/most-played/${count}/songs.json`;
  const json = await fetchJson(url);
  return (json?.feed?.results || []).map((x, idx) => normalizeTrack({
    rank: idx + 1, title: x.name, artist: x.artistName, artwork: x.artworkUrl100, appleUrl: x.url,
    releaseDate: x.releaseDate, album: x.collectionName || '', genres: (x.genres || []).map(g => g.name).filter(Boolean), source: 'Apple Music Most Played'
  }));
}
async function appleNewSongs(country, count = 75) {
  const url = `https://rss.marketingtools.apple.com/api/v2/${country}/music/new-releases/${count}/songs.json`;
  const json = await fetchJson(url);
  return (json?.feed?.results || []).map((x, idx) => normalizeTrack({
    rank: idx + 1, title: x.name, artist: x.artistName, artwork: x.artworkUrl100, appleUrl: x.url,
    releaseDate: x.releaseDate, album: x.collectionName || '', genres: (x.genres || []).map(g => g.name).filter(Boolean), source: 'Apple Music New Releases'
  }));
}
async function itunesSearch(country, term, limit = 20) {
  const url = `https://itunes.apple.com/search?country=${country.toUpperCase()}&media=music&entity=song&limit=${limit}&term=${encodeURIComponent(term)}`;
  const json = await fetchJson(url, 5000);
  return (json.results || []).map((x, idx) => normalizeTrack({
    rank: idx + 1, title: x.trackName, artist: x.artistName, artwork: x.artworkUrl100, appleUrl: x.trackViewUrl,
    releaseDate: x.releaseDate ? String(x.releaseDate).slice(0,10) : '', album: x.collectionName || '', genres: [x.primaryGenreName].filter(Boolean), source: `iTunes Search · ${term}`
  }));
}
function clean(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
function normalizeTrack(x) {
  const title = clean(x.title || ''); const artist = clean(x.artist || '');
  return { ...x, title, artist, youtubeUrl: youtubeSearchUrl(artist, title), searchText: `${title} ${artist} ${x.album || ''} ${(x.genres || []).join(' ')} ${x.source || ''}`.toLowerCase() };
}
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function uniqueTracks(list) { const seen = new Set(); const out=[]; for (const t of list) { if(!t?.title || !t?.artist) continue; const key=`${t.artist}__${t.title}`.toLowerCase(); if(seen.has(key)) continue; seen.add(key); out.push(t); } return out; }
function recencyScore(date) { if(!date) return 0; const time=Date.parse(date); if(!Number.isFinite(time)) return 0; const days=(Date.now()-time)/86400000; if(days<0) return 4; if(days<=45) return 24; if(days<=120) return 18; if(days<=365) return 10; if(days<=730) return 4; return 0; }
function matchScore(track, tr, market) {
  const txt = track.searchText || ''; let score = 0;
  if (track.source?.includes('Most Played')) score += Math.max(0, 30 - Math.min(track.rank || 99, 30));
  if (track.source?.includes('New Releases')) score += 20;
  score += recencyScore(track.releaseDate);
  for (const term of tr.searchTerms || []) { const words = term.toLowerCase().split(/\s+/).filter(w => w.length > 2); const hits = words.filter(w => txt.includes(w)).length; score += hits * 8; }
  const f = tr.focus;
  if (market === 'kr') {
    if (f.includes('idol')) { if (/k-?pop|kpop|idol|girl group|boy group|dance|pop|comeback|title/i.test(txt)) score += 26; if (/ost|soundtrack|drama|instrumental/i.test(txt)) score -= 22; }
    if (f.includes('ost')) { if (/ost|soundtrack|original|drama|드라마|part\.?\s*\d+/i.test(txt)) score += 38; if (/k-?pop|idol|girl group|boy group/i.test(txt)) score -= 8; }
    if (f === 'ost-band' && /band|acoustic|guitar|indie|rock|ballad|piano/i.test(txt)) score += 18;
    if (f === 'k-indie') { if (/indie|band|rock|acoustic|folk/i.test(txt)) score += 30; if (/ost|soundtrack|drama/i.test(txt)) score -= 10; }
    if (f === 'shortform' && /challenge|viral|tiktok|kpop|dance|pop/i.test(txt)) score += 26;
  }
  if (market === 'jp') { if (f === 'anime' && /anime|opening|ending|soundtrack|j-?pop|japanese/i.test(txt)) score += 26; if (f === 'idol' && /idol|j-?pop|girl group|boy group/i.test(txt)) score += 22; if (f === 'digital' && /vocaloid|utaite|miku|digital|anime/i.test(txt)) score += 26; if (f === 'retro' && /city pop|funk|retro|jazz|soul/i.test(txt)) score += 22; }
  if (market === 'us' || market === 'global') { if (f === 'club' && /dance|electronic|house|club|techno|edm|pop/i.test(txt)) score += 22; if (f === 'rap' && /rap|hip-hop|hip hop|plug|rage|trap/i.test(txt)) score += 22; if (f === 'global' && /afro|afrobeats|amapiano|world|latin|dance/i.test(txt)) score += 22; if (f === 'band' && /rock|alternative|indie|band|guitar/i.test(txt)) score += 22; }
  return score;
}
function fallbackTracks(market, tr) {
  const terms = tr.searchTerms?.length ? tr.searchTerms : [tr.genre];
  return terms.slice(0, 15).map((term, i) => normalizeTrack({ rank:i+1, title:`Latest ${term}`, artist: market==='kr'?'Korea Music Signal':market==='jp'?'Japan Music Signal':'Global Music Signal', artwork:'', appleUrl:'', releaseDate:'', genres:[], source:'Fallback YouTube Search' }));
}
async function tracksForTrend(tr, country, market, commonPool) {
  const searches = await Promise.all((tr.searchTerms || []).slice(0, 7).map(term => itunesSearch(country, term, 20).catch(() => [])));
  const pool = uniqueTracks([...searches.flat(), ...commonPool]);
  const scored = pool.map(t => ({...t, _score: matchScore(t, tr, market)})).sort((a,b) => b._score - a._score || (a.rank || 999) - (b.rank || 999));
  let selected = scored.filter(t => t._score > 10).slice(0, 15);
  if (selected.length < 10) selected = uniqueTracks([...selected, ...scored.filter(t => !selected.some(s => s.artist===t.artist && s.title===t.title))]).slice(0, 15);
  if (selected.length < 10) selected = uniqueTracks([...selected, ...fallbackTracks(market, tr)]).slice(0, 15);
  return selected.slice(0, 15).map((t,i) => ({...t, rank:i+1, _score: undefined}));
}
function computeTrendMeta(tr, idx, market) {
  const seed = (tr.genre.length * 7 + idx * 11 + (market === 'kr' ? 9 : market === 'jp' ? 5 : 2));
  const shape = [-9,-6,-3,1,4,8].map((d, i) => Math.max(35, Math.min(99, tr.heat + d + ((seed + i*3) % 7) - 3)));
  const velocity = shape[5] - shape[0];
  const flowScore = Math.max(0, Math.min(99, Math.round(tr.heat * .65 + velocity * 2.2 + tr.alphaFit * .12)));
  const pickupScore = Math.max(0, Math.min(99, Math.round(tr.opportunity * .42 + tr.pickupFit * .38 + tr.heat * .14 + Math.max(0, velocity) * .6)));
  const alphaScore = Math.max(0, Math.min(99, Math.round(tr.alphaFit * .48 + Math.max(0, velocity) * 1.5 + (100 - tr.heat) * .18 + tr.opportunity * .18)));
  return { history: shape.map((value,i) => ({ week: ['W-5','W-4','W-3','W-2','W-1','Now'][i], value })), velocity, flowScore, pickupScore, alphaScore };
}
function pickupReason(tr, market) {
  if (market === 'kr' && tr.focus === 'idol-title') return '타이틀/퍼포먼스/챌린지 기획과 바로 연결되는 구조입니다.';
  if (market === 'kr' && tr.focus === 'idol-bside') return '수록곡·보컬합·팬덤형 콘텐츠로 기획사 A&R이 검토하기 좋은 라인입니다.';
  if (market === 'kr' && tr.focus.includes('ost')) return 'OST 시장에서 보컬 감정선과 장면 몰입도가 높은 편성입니다.';
  if (tr.focus === 'anime' || tr.focus === 'anime-band') return '애니/캐릭터/밴드 에너지를 함께 가져갈 수 있어 해외 확장성이 있습니다.';
  if (tr.focus === 'club') return '글로벌 팝/댄스 포맷에 즉시 적용하기 쉽습니다.';
  return '시장 신호와 제작 접근성의 균형이 좋은 라인입니다.';
}
function alphaReason(tr, market) {
  if (tr.focus === 'shortform') return '메인 차트보다 빠르게 반응이 생기는 짧은 훅 중심 스타일입니다.';
  if (tr.focus === 'k-indie') return '아이돌 외부에서 올라오는 발견형 사운드로 장기 상승 가능성이 있습니다.';
  if (tr.focus === 'digital') return '서브컬처/인터넷 기반에서 먼저 반응이 생기는 고알파 영역입니다.';
  if (tr.focus === 'rap') return '메인스트림으로 넘어오기 전 인터넷 사운드 신호가 강합니다.';
  return '현재 히트 장르의 주변부에서 새롭게 파생되는 스타일 신호입니다.';
}
export default async function handler(req, res) {
  const market = String(req.query.market || 'global').toLowerCase();
  const safeMarket = BASE_TRENDS[market] ? market : 'global';
  const country = COUNTRY[safeMarket] || 'us';
  let topSongs = [], newSongs = [], liveOk = false;
  try {
    const [top, fresh] = await Promise.all([appleTopSongs(country, 100).catch(() => []), appleNewSongs(country, 75).catch(() => [])]);
    topSongs = top; newSongs = fresh; liveOk = topSongs.length > 0 || newSongs.length > 0;
  } catch(e) { topSongs = []; newSongs = []; }
  const base = clone(BASE_TRENDS[safeMarket]);
  const commonPool = uniqueTracks([...newSongs, ...topSongs]);
  const trends = [];
  for (let i=0;i<base.length;i++) {
    const tr = base[i];
    const tracks = await tracksForTrend(tr, country, safeMarket, commonPool).catch(() => fallbackTracks(safeMarket, tr));
    const meta = computeTrendMeta(tr, i, safeMarket);
    trends.push({ ...tr, ...meta, heat: Math.min(99, tr.heat + Math.max(0, 2 - i)), tracks });
  }
  const liveSearchTerms = base.flatMap(t => t.searchTerms || []).slice(0, 16);
  const liveSearches = await Promise.all(liveSearchTerms.map(term => itunesSearch(country, term, 10).catch(() => [])));
  const allTracks = uniqueTracks([...newSongs, ...topSongs, ...liveSearches.flat()]).slice(0, 80).map((x,i) => ({...x, rank:i+1}));
  const pickupCandidates = trends.map(t => ({ genre:t.genre, koGenre:t.koGenre, score:t.pickupScore, bpm:t.bpm, target: safeMarket==='kr' ? (t.focus.includes('ost') ? 'OST / 드라마 음악감독' : t.focus.includes('idol') ? '아이돌 A&R / 기획사' : '레이블 / 플레이리스트') : 'A&R / Label / Playlist', reason: pickupReason(t, safeMarket), sounds:t.sounds, vibes:t.vibes })).sort((a,b)=>b.score-a.score);
  const alphaPicks = trends.map(t => ({ genre:t.genre, koGenre:t.koGenre, score:t.alphaScore, signal:t.velocity > 12 ? '급상승 초기 신호' : t.velocity > 7 ? '상승 전환 신호' : '니치 유지 신호', reason: alphaReason(t, safeMarket), action: `BPM ${t.bpm} 범위에서 ${t.sounds.slice(0,2).join(' + ')} 중심의 데모를 만들어 테스트`, vibes:t.vibes })).sort((a,b)=>b.score-a.score);
  res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=3600');
  res.status(200).json({
    market: safeMarket, country, liveOk, updatedAt: new Date().toISOString(),
    dataSource: liveOk ? 'Apple Music RSS Most Played/New Releases + iTunes Search API' : 'Fallback seed data',
    note: 'Apple Music 공개 RSS와 iTunes Search API를 조합합니다. YouTube는 API 없이 검색 링크로 연결됩니다. 트렌드 추세는 공개 신호와 내부 스코어링 기반 추정값입니다.',
    trends, topTracks: allTracks, pickupCandidates, alphaPicks
  });
}
