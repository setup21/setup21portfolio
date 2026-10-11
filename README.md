# setup21portfolio backend

새 게임용 Node.js + TypeScript + Express + Mongoose 서버의 초기 뼈대입니다.

## 실행 준비

1. `.env.example`을 `.env`로 복사하고 새 Azure DocumentDB 연결 정보와 임의의 JWT 키를 설정합니다.
2. `npm install`
3. 개발 실행: `npm run dev`
4. 빌드 및 실행: `npm run build`, `npm start`

Azure App Service의 GitHub Actions 연결과 실제 배포 workflow는 새 GitHub 저장소를 만든 뒤 Azure Deployment Center에서 설정합니다. 연결 문자열과 비밀 키는 저장소에 커밋하지 말고 App Service 환경 변수로 등록하세요.

기존 게임의 API 구현과 게임 데이터는 복사하지 않았습니다. 라우터는 새 게임 기능을 추가할 위치만 제공합니다.
