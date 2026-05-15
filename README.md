# Producer Trend Radar v3.5

무료/정적 Vercel 배포용 음악 트렌드 레이더입니다.

## v3.5 변경점

- 메인 화면에서 프로듀서 RSS 즉시 호출 제거
- `프로듀서 꿀팁` 탭 추가
- 해당 탭 클릭 시에만 `/api/tips`를 호출하는 lazy loading 적용
- Bedroom Producers Blog 제거
- 소스 교체: Sound On Sound, MusicTech, Attack Magazine, Splice Blog
- 플러그인 할인/무료 번들/세일성 뉴스 제외 필터 추가
- 제작기, 사운드 디자인, 믹싱/마스터링, 송라이팅/편곡, 보컬, 워크플로우 카테고리 필터 추가
- 기존 서버 사이드 한국어 번역/fallback 유지

## 포함 기능

- Global / US / Japan / Korea 시장 탭
- 장르별 핫 트랙 10개 이상
- YouTube 검색 링크
- 트렌드 변화 추세 차트
- 기획사/A&R 픽업 가능성 탭
- 시장 알파픽 신호 탭
- 실시간 공개 음악 신호 UI
- 프로듀서 꿀팁 탭
- 서버 사이드 한국어 번역 시도
- 번역 실패 시 한국어 요약 fallback

## 파일 구조

```txt
index.html
vercel.json
README.md
api/trends.js
api/tips.js
```

## 배포

GitHub에 위 파일만 업로드하고 Vercel에 연결하면 됩니다.
`package.json`이 없으므로 npm install이 실행되지 않습니다.
