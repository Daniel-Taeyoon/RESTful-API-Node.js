
// MongoDB에 스키마를 생성 및 저장하는 코드

const mongoose = require('mongoose');

// 주문 시 '상품 ID' 값과 '수량'을 받아온다.
// DB에 구매한 날짜로 저장된다.
const user_orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  syncTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User_Order', user_orderSchema);
