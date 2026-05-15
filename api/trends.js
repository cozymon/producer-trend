const seed = {
  global: {
    meta: {
      title: 'Global Producer Overview',
      hotSignal: 'Dance-pop energy is absorbing R&B, idol pop, and alt-pop.',
      liquidityShift: 'From minimal chill pop → rhythm-forward glossy pop',
      focus: 'Global cross-market trend signals'
    },
    trends: [
      trend('Electronic Pop', 'Global Pop / Dance', 94, 92, '+18%', 'Exploding', '120–130', ['house kick','techno synth','club bass','chopped vocal'], ['glossy','night','confident','festival'], 'Make a clean pop topline over a club backbone. Keep the hook simple and repeatable.', 'electronic pop official music video'),
      trend('Anime-influenced Band Pop', 'Anime / OST', 89, 91, '+13%', 'Rising', '145–178', ['bright guitar','fast drums','piano lift','big chorus'], ['youthful','bittersweet','dramatic','hopeful'], 'Build an emotional pre-chorus and a chorus that feels like an opening theme.', 'anime pop opening song'),
      trend('PluggnB / Melodic Rap', 'Rap / Internet Pop', 86, 87, '+9%', 'Hot', '140–160 / half-time', ['soft 808','bell synth','dreamy keys','tight hats'], ['dreamy','sad','cute','flex'], 'Useful for idol rap sections, solo tracks, and emotional short-form hooks.', 'pluggnb melodic rap official audio'),
      trend('Organic Acoustic Pop', 'Singer-songwriter / OST', 79, 81, '+6%', 'Warming', '78–105', ['acoustic guitar','room vocal','soft percussion','warm pad'], ['intimate','honest','nostalgic','human'], 'Great contrast against over-polished electronic music. Strong for emotional storytelling.', 'acoustic pop official video')
    ]
  },
  us: {
    meta: {
      title: 'US Market',
      hotSignal: 'Electronic, pluggnB, and crossover pop are the strongest producer lanes.',
      liquidityShift: 'From trap-only dominance → dance, country, afro, and alt-pop hybrids',
      focus: 'US pop, rap, dance, and crossover market'
    },
    trends: [
      trend('Electronic Pop', 'Pop / Dance', 95, 93, '+21%', 'Exploding', '120–132', ['4-on-floor','techno lead','vocal chop','sidechain pad'], ['club','glossy','late night','confident'], 'Best lane for pop hooks that need energy without losing mainstream accessibility.', 'electronic pop official music video'),
      trend('PluggnB', 'Rap / Internet Pop', 89, 88, '+11%', 'Hot', '145–160', ['bell pluck','soft 808','airy pad','rolling hats'], ['dreamy','melodic','internet','sad flex'], 'Strong for melodic rap and idol-adjacent singing rap ideas.', 'pluggnb official audio'),
      trend('Afro-pop Fusion', 'Global Rhythm Pop', 84, 85, '+8%', 'Rising', '95–115', ['afro percussion','warm bass','chant hook','soft synth'], ['warm','global','danceable','sunset'], 'Use rhythm influence carefully. Blend with pop songwriting rather than copying a template.', 'afropop fusion official music video'),
      trend('Alt-Rock Pop Revival', 'Band / Pop Rock', 81, 80, '+7%', 'Rising', '110–160', ['live guitar','punchy drums','distorted bass','anthem hook'], ['youth','angst','nostalgia','arena'], 'Good for emotional choruses and comeback-style artist positioning.', 'alt rock pop official music video')
    ]
  },
  jp: {
    meta: {
      title: 'Japan Market',
      hotSignal: 'Melody-first anime/band pop remains the highest-value producer lane.',
      liquidityShift: 'From pure city-pop nostalgia → anime, utaite, band, and game-pop fusion',
      focus: 'Anime, idol, Vocaloid, and band-pop market'
    },
    trends: [
      trend('Anime Pop', 'Anime / OST', 96, 95, '+19%', 'Exploding', '150–180', ['bright guitar','fast drums','piano','orchestral lift'], ['dramatic','hopeful','bittersweet','youthful'], 'Think opening-theme chorus: emotional, fast, clear, and instantly singable.', 'anime opening jpop official music video'),
      trend('Idol Band Pop', 'Idol / Band', 88, 90, '+10%', 'Hot', '135–170', ['clean guitar','live drums','sparkle synth','group chant'], ['cute','bright','school','memory'], 'Perfect for cute-but-emotional toplines and character-driven visual identity.', 'japanese idol band pop official music video'),
      trend('Vocaloid / Utaite-core', 'Vocaloid / Utaite', 85, 82, '+8%', 'Rising', '150–190', ['fast arp','digital piano','tight drums','pitch detail'], ['chaotic','clever','digital','expressive'], 'Use sharp melody writing and unusual phrasing. The topline is the engine.', 'vocaloid utaite official music video'),
      trend('Neo City Pop', 'City Pop / Nostalgia', 76, 74, '+3%', 'Stable', '90–115', ['funk guitar','analog keys','warm bass','soft drums'], ['urban','romantic','nostalgic','soft night'], 'Still useful, but strongest when modernized with fresh drums or idol-pop structure.', 'neo city pop japan official music video')
    ]
  },
  kr: {
    meta: {
      title: 'Korea Market',
      hotSignal: 'Korea should be read through two separate lanes: idol market and OST market.',
      liquidityShift: 'Idol lane: dance/house/rhythm. OST lane: emotional ballad, band pop, acoustic drama themes.',
      focus: 'Korea Focus: Idol Market + Drama OST Market'
    },
    trends: [
      trend('Idol House / Dance K-pop', 'Idol Market', 95, 96, '+18%', 'Exploding', '122–130', ['house kick','pluck bass','clean clap','glossy synth'], ['runway','luxury','night','confident'], 'Strongest lane for idol solo, group comeback, remix, and performance-oriented tracks.', 'kpop house dance official music video'),
      trend('Idol Easy R&B / Pop', 'Idol Market', 87, 88, '+8%', 'Hot', '85–105', ['soft drums','warm pad','minimal bass','airy vocal'], ['daily','chill','intimate','clean'], 'Useful for idol B-sides, solo releases, and soft viral hooks. Needs a distinct topline to avoid sounding generic.', 'kpop easy rnb official audio'),
      trend('K-Drama OST Ballad Pop', 'OST Market', 91, 94, '+15%', 'Rising', '68–92', ['piano intro','string lift','warm vocal','big final chorus'], ['emotional','cinematic','longing','bittersweet'], 'Important lane for Korean drama OST. Focus on melody, lyric emotion, and a chorus that can carry a scene.', 'korean drama ost ballad official music video'),
      trend('K-Drama OST Band / Acoustic', 'OST Market', 86, 90, '+12%', 'Rising', '78–118', ['clean guitar','acoustic guitar','live drums','room reverb'], ['nostalgic','youth','honest','memory'], 'Great for youth drama, romance scenes, indie crossover, and Sunday Moon-like emotional identity.', 'korean drama ost band acoustic official audio')
    ]
  }
};

function trend(genre, lane, heat, opportunity, momentum, status, bpm, sounds, vibes, brief, query) {
  return { genre, lane, heat, opportunity, momentum, status, bpm, sounds, vibes, brief, query, tracks: fallbackTracks(genre, query) };
}

function youtubeSearchUrl(q) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

function fallbackTracks(genre, query) {
  return [
    { trackName: `${genre} reference signal`, artistName: 'YouTube', genre, source: 'YouTube Search', youtubeUrl: youtubeSearchUrl(query), trackUrl: youtubeSearchUrl(query) },
    { trackName: `${genre} producer references`, artistName: 'YouTube', genre, source: 'YouTube Search', youtubeUrl: youtubeSearchUrl(`${query} playlist`), trackUrl: youtubeSearchUrl(`${query} playlist`) }
  ];
}

const countryByMarket = { global:'US', us:'US', jp:'JP', kr:'KR' };

function toTrack(x, lane, genre) {
  const name = x.trackName || 'Untitled';
  const artist = x.artistName || '';
  const youtubeQuery = `${artist} ${name} official audio music video`;
  return {
    trackName: name,
    artistName: artist,
    genre: x.primaryGenreName || genre,
    lane,
    source: 'iTunes Search + YouTube Search',
    artwork: x.artworkUrl100 || '',
    previewUrl: x.previewUrl || '',
    trackUrl: x.trackViewUrl || '',
    youtubeUrl: youtubeSearchUrl(youtubeQuery)
  };
}

async function fetchTracksForTrend(trend, country) {
  try {
    const q = encodeURIComponent(trend.query || trend.genre);
    const url = `https://itunes.apple.com/search?term=${q}&country=${country}&media=music&entity=song&limit=6`;
    const r = await fetch(url, { headers: { 'User-Agent': 'ProducerTrendRadar/2.0' } });
    if (!r.ok) return trend.tracks;
    const json = await r.json();
    const results = Array.isArray(json.results) ? json.results : [];
    const tracks = results.slice(0, 5).map(x => toTrack(x, trend.lane, trend.genre));
    return tracks.length ? tracks : trend.tracks;
  } catch (e) {
    return trend.tracks;
  }
}

function adjustWithLiveData(trends) {
  return trends.map((t, i) => {
    const count = Array.isArray(t.tracks) ? t.tracks.length : 0;
    const bump = Math.min(4, Math.floor(count / 2));
    return {
      ...t,
      heat: Math.min(99, t.heat + (i === 0 ? bump : Math.max(0, bump - 1))),
      opportunity: Math.min(99, t.opportunity + (t.lane && t.lane.includes('OST') ? 1 : 0))
    };
  });
}

module.exports = async function handler(req, res) {
  const market = (req.query.market || 'global').toLowerCase();
  const selected = seed[market] ? market : 'global';
  const base = seed[selected];
  const country = countryByMarket[selected] || 'US';

  let liveSource = 'seed fallback + YouTube search links';
  let trends = base.trends.map(t => ({ ...t }));

  try {
    const enriched = await Promise.all(trends.map(async t => ({ ...t, tracks: await fetchTracksForTrend(t, country) })));
    trends = adjustWithLiveData(enriched);
    liveSource = 'iTunes Search API + YouTube search links';
  } catch (e) {}

  const allTracks = trends.flatMap(t => (t.tracks || []).map(x => ({ ...x, lane: x.lane || t.lane, parentGenre: t.genre })));

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  res.status(200).json({
    market: selected,
    updatedAt: new Date().toISOString(),
    meta: base.meta,
    live: {
      source: liveSource,
      itemCount: allTracks.length,
      examples: allTracks.slice(0, 12)
    },
    trends,
    soundRadar: [
      { axis:'Drums', value:92 }, { axis:'Bass', value:84 }, { axis:'Melody', value:96 },
      { axis:'Vocals', value:90 }, { axis:'Texture', value:78 }, { axis:'Viral', value:86 }
    ],
    momentum: [
      { week:'W-5', value:64 }, { week:'W-4', value:69 }, { week:'W-3', value:73 },
      { week:'W-2', value:81 }, { week:'W-1', value:87 }, { week:'Now', value:94 }
    ]
  });
};
