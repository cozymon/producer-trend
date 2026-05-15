# Producer Trend Radar v3.3

무료/무과금 정적 배포 버전입니다.

## 포함 기능

- Global / US / Japan / Korea 시장 탭
- 장르별 트렌드 변화 추세 차트
- 장르별 유동성 점수
- 관련 Hot Tracks / YouTube 검색 링크
- 기획사/A&R 픽업 가능성 탭
- 시장 알파픽 신호 탭
- 실시간 공개 음악 신호
- 실시간 프로듀서 인사이트 RSS 피드
- 해외 프로듀서 정보 사이트 제목/요약 한국어 번역

## 데이터 소스

- Apple Music RSS Most Played / New Releases
- iTunes Search API
- LANDR Blog RSS
- Bedroom Producers Blog RSS
- MusicTech RSS
- Attack Magazine RSS
- Produce Like A Pro RSS
- Tracklib Blog RSS
- MyMemory Translation API for short Korean translation fallback

## 배포

GitHub 저장소에는 아래 파일만 올리면 됩니다.

```txt
index.html
vercel.json
README.md
api/trends.js
api/tips.js
```

`package.json`이 없으므로 npm install이 실행되지 않습니다.

## 주의

번역 기능은 RSS의 제목과 짧은 요약만 번역합니다. 전문은 원문 링크에서 확인하세요.
