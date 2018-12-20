

//1. server.js 가 실행된다.
  // - node js는 웹서버(ex. Apache 등)의 기능을 갖고있다.
  // - 모듈 설치를 통해 npm을 관리할 수 있다. --> npm 관리는 package.json에서 한다.

// 2. 3000 포트에 접속할 경우 서버가 생성된다.

// 3. 사용자가 접속했을 경우 app.js 자바스크립트로 이동한다.


const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);


server.listen(port);
