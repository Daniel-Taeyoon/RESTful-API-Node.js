# Node JS, Express를 이용한 장바구니 서버 제작
제작기간 : 2018.12.15 ~ 12.20



## 서버 구축 및 환경

- 서버 구축
    - AWS EC2 Ubuntu 16.04 LTS 버전 사용
    - Node.js / MongoDB 설치

[API 목록]

<img width="754" alt="api" src="https://user-images.githubusercontent.com/30804139/50874566-dc9b4280-1407-11e9-926d-a2561fc0cf10.png">




## 세부내용

1. 쇼핑목록 추가 및 검색  ⇒ (완료)
    - 기능 정의 : 쇼핑상품 추가 등록 및 검색 기능
    - 해당 문서파일 : api/routes/products.js, api/models/product.js
    - 데이터베이스 구조
  <img width="805" alt="default" src="https://user-images.githubusercontent.com/30804139/50874973-97781000-1409-11e9-86f4-c29c31521156.png">
  
  


2. 장바구니 담기 ⇒ (완료)

   - 기능 정의 : 사용자가 로그인 했을 때 장바구니 담기 기능
   - 해당 문서파일 : api/routes/user_shoppings.js, api/models/userName_shopping.js
   - `추가 고려사항 : 파일명(ex. 'user_shoppings' or 'userName_shopping')을 로그인한 사용자의 ID로 변경`
   - 데이터베이스 구조
   <img width="677" alt="default" src="https://user-images.githubusercontent.com/30804139/50874977-9a730080-1409-11e9-938d-bcdd68308762.png">


3. 장바구니 검색 ⇒ (완료)

   - 기능 정의 : 사용자가 저장한 장바구니에서 상품 검색
   - 문서파일 및 데이터베이스 구조는 위의 2번과 같다
       - `추가 고려사항  - 현재 장바구니 ID 값으로 검색 가능. / '쇼핑목록 검색' 기능 처럼 상품명에 따라 검색 기능 필요`


4. 장바구니 물품 삭제 및 전체 삭제 ⇒ (완료)
   - 기능 정의 : 장바구니에 존재하는 특정 물품 삭제 및 전체 삭제
   - 문서파일 및 데이터베이스 구조는 위의 2번과 같다


5. 구매하기 ⇒ (완료)

   - 기능 정의 : 사용자가 물품을 구매했을 경우
   - 해당 문서파일 : api/routes/orders.js, api/models/order.js
      - `추가 고려사항 : 사용자의 장바구니에 저장된 물품과 동일하다면 제거`
   - 데이터베이스 구조
   <img width="673" alt="default" src="https://user-images.githubusercontent.com/30804139/50874982-9e068780-1409-11e9-97b7-79f22db10b9a.png">
   
   



6. 구매물품 리스트 검색 ⇒ (완료)

    - 기능 정의 : 사용자가 구매한 물품 리스트를 보여준다.
    - 문서파일 및 데이터베이스 구조는 위의 5번과 동일하다
