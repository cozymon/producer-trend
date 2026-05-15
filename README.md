# Producer Trend Radar v3.4

무료/정적 Vercel 배포용 음악 트렌드 레이더입니다.

## 포함 기능

- Global / US / Japan / Korea 시장 탭
- 장르별 핫 트랙 10개 이상
- YouTube 검색 링크
- 트렌드 변화 추세 차트
- 기획사/A&R 픽업 가능성 탭
- 시장 알파픽 신호 탭
- 실시간 공개 음악 신호 UI
- 해외 프로듀서 정보 RSS 수집
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
