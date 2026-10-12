# setup21portfolio backend

새 게임용 Node.js + TypeScript + Express + Mongoose 서버의 초기 뼈대입니다.

## 실행 준비

1. `.env.example`을 `.env`로 복사하고 새 Azure DocumentDB 연결 정보와 임의의 JWT 키를 설정합니다.
2. `npm install`
3. 개발 실행: `npm run dev`
4. 빌드 및 실행: `npm run build`, `npm start`

Azure App Service의 GitHub Actions 연결과 실제 배포 workflow는 새 GitHub 저장소를 만든 뒤 Azure Deployment Center에서 설정합니다. 연결 문자열과 비밀 키는 저장소에 커밋하지 말고 App Service 환경 변수로 등록하세요.

기존 게임의 API 구현과 게임 데이터는 복사하지 않았습니다. 라우터는 새 게임 기능을 추가할 위치만 제공합니다.

## 계정 API

- `POST /account/register`: `{ "username": "player1", "password": "..." }`로 계정을 만듭니다. 비밀번호는 bcrypt로 해싱해 저장합니다.
- `POST /account/login`: 같은 JSON 형식으로 로그인하며, 성공하면 1시간 유효 JWT를 반환합니다. 응답의 `data.status`는 성공 `1`, 아이디 없음 `-1`, 비밀번호 불일치 `-2`입니다.
- Azure App Service에서 JWT 발급을 위해 `JWT_SECRET` 앱 설정도 추가해야 합니다. 충분히 길고 임의적인 값으로 설정하고 저장 후 앱을 재시작하세요. 이 키는 저장소에 올리지 마세요.
- 로컬에서 Node의 SRV DNS 조회가 실패하는 네트워크라면 `.env`에 `MONGO_DNS_SERVERS=8.8.8.8`을 추가하면 `npm start`가 해당 DNS를 사용합니다. Azure App Service에는 이 설정을 추가하지 않아 Azure 기본 DNS를 사용하게 하세요.

로그인은 이 프로젝트의 `users` 컬렉션만 사용합니다. 기존 게임의 프로필·아이템 데이터 모델은 가져오지 않았습니다.

## 웹앱 상태 API

- GET /webapp/health: 서버가 요청을 처리할 수 있으면 { "result": true, "data": { "status": "ok" } }를 반환합니다.
- GET /webapp/maintance: 점검 중 여부를 boolean으로 반환합니다. MAINTENANCE=true일 때 점검 중이며, 기존 프로젝트의 설정 이름 maintance도 호환됩니다.
- GET /webapp/version: SERVER_VERSION 값을 반환합니다. 값이 없으면 기존 설정 이름 version, 그 다음 package.json 버전을 사용합니다.
- Azure App Service의 환경 변수 > 앱 설정에 MAINTENANCE, SERVER_VERSION을 등록하면 됩니다. MAINTENANCE는 true 또는 false, SERVER_VERSION은 배포 버전 문자열로 설정하세요.
- 두 API는 /docs Swagger 문서의 Webapp 태그에 표시됩니다.
