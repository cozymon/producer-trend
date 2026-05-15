# Producer Trend Radar — KR/EN + YouTube Track Links

Dependency-free Vercel deployable static music trend dashboard for producers.

## Features

- No `package.json`
- No `npm install`
- No API key required
- Korean / English toggle
- Global / US / Japan / Korea market tabs
- Korea market focused on Idol Market + Drama OST Market
- Genre liquidity cards
- Producer Opportunity Score
- Search by genre, sound, vibe, lane
- Producer Brief
- Sound Palette / Vibe Tags
- Genre Liquidity chart
- Sound & Vibe Radar chart
- Momentum chart
- Hot track signals by selected genre
- YouTube search links for each track
- iTunes Search API enrichment with seed fallback

## File structure

```txt
index.html
vercel.json
README.md
api/trends.js
```

## Deploy

Upload only these files to your GitHub repo, then redeploy on Vercel.

Remove old files such as:

```txt
package.json
package-lock.json
pnpm-lock.yaml
app/
components/
lib/
tailwind.config.ts
next.config.js
```
