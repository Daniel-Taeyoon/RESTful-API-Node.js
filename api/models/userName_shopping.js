
// MongoDB에 스키마를 생성 및 저장하는 코드

const mongoose = require('mongoose');

// product에 등록된 상품 ID를 저장시킨다.
const user_orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});

module.exports = mongoose.model('userName_shopping', user_orderSchema);
