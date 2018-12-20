
// < 물품 구매 및 리스트를 조회하기 위한 페이지 >
// '구매하기 / 구매물품 리스트 검색 기능' 가능

const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


// 각각의 데이터베이스 스키마를 갖고온다.
const Order = require("../models/order");
const Product = require("../models/product");


// 구매물품 리스트 검색
router.get("/", (req, res, next) => {
  Order.find()
    .select("product quantity _id syncTime")

    // product에 일치한 ID 값의 해당 데이터 내용을 모두 볼 수 있다.
    // 만약 특정 데이터를 보기 원한다면, ex) .populate('product', 'name')   --> 이러한 형식으로 작성하면 된다.
    .populate('product')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            syncTime: doc.syncTime,
            request: {
              type: "GET",
              url: "http://34.210.228.81:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



// 구매하기 기능
router.post("/", (req, res, next) => {


  // 입력한 아이디 값이 Product에 존재하지 않을 경우 에러 발생
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "상품이 존재하지 않습니다."
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "구매하였습니다.",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://34.210.228.81:3000/orders/" + result._id
        }
      });
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});




// 주문한 것을 조회하는 기능
router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://34.210.228.81:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



// 주문취소 기능
router.delete("/:orderId", (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



module.exports = router;
