# Producer Trend Radar v2 Category Matching

정적 HTML + Vercel Serverless Function 버전입니다.

- package.json 없음
- npm install 없음
- API 키 없음
- Apple Music RSS 공개 JSON feed 사용
- iTunes Search API 보조 사용
- 장르별 카테고리 매칭 강화
- 장르별 Hot Tracks 10~15개 표시
- 한국 탭은 Idol / OST / K-indie 중심
- YouTube API 없이 YouTube 검색 링크 제공
- 실시간 공개 음악 신호 최대 60개 표시

## 배포

GitHub repository 안의 기존 파일을 모두 삭제한 뒤 아래 파일만 업로드하세요.

- index.html
- vercel.json
- api/trends.js
- README.md

Vercel에서 Redeploy 시 Clear Build Cache를 체크하세요.
