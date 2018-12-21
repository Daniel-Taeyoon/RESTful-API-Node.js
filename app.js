

// 1. 프론트 단에서 접속한다.
// 2. 어디로 접속할 것인지 확인한다.(ex. 'api/routes/product' or 'api/routes/orders')
// 3. URL을 확인한다.
//    - 만약 존재하지 않는 URL이라면, 404 에러
//    - 서버 내부 오류라고 한다면, 500 에러




// 아래의 require 중 "express / morgan / body-parser / mongoose" 기능들은 서버 노드에 설치해줘야 사용가능하다.
// ex) npm install --save body-parser
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const user_shoppings_Routes = require("./api/routes/user_shoppings");
const mongoose = require('mongoose');


// MongoDB 접속. 포트 번호는 설정되어있다. 포트 번호를 변경하고자 할 때는 환경 설정?도 변경시켜 줘야함
// 27017/'____DB명____' 데이터베이스 이름이 들어간다. MongoDB에 존재하지 않는 DB 이름의 경우 자동으로 생성시켜준다.
mongoose.connect('mongodb://localhost:27017/Fifty_Bridge', { useNewUrlParser: true });


// cmd 창에 접속 기록 내역이 남는 모듈
// morgan도 서버에 따로 설치해줘야 사용 가능
app.use(morgan("dev"));


// 주소 창에 이미지파일 경로(uploads)를 고정으로 지정
app.use('/uploads', express.static('uploads'));



// bodyParser를 활용해 사용자가 입력한 데이터를 받아올 수 있다.
// 프론트에서 json 방식으로 전송한 것을 읽어올 수 있다.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 사용자가 지정한 URL에 따라 각각의 파일로 이동할 수 있게 만들어주는 코드
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user_shoppings", user_shoppings_Routes)


// Handling CORS 관련된 코드이다.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // 메소드가 정해져있지 않았을 경우 Error 메세지
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});



// Error 메세지 호출
// '404' : 문서를 찾을 수 없는 경우
// '500' : 서버 내부의 문제
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
