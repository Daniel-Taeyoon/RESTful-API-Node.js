
// MongoDB에 스키마를 생성 및 저장하는 코드

const mongoose = require('mongoose');


// 스키마 구조를 지정하는 코드이다.
// type은 자료형, required는 데이터가 존재해야 DB에 저장될 수 있다는 조건이다.
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
  detail: {type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
