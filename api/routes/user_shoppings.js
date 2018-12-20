
// 장바구니 API
// 장바구니 담기 / 장바구니 검색 / 장바구니 물품 삭제 및 전체 삭제

const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


// 각각의 데이터베이스 스키마를 갖고온다.
const userName = require("../models/userName_shopping");
const Product = require("../models/product");



// 장바구니 내 특정상품 조회
router.get("/:user_search", (req, res, next) => {
  userName.findById(req.params.user_search)
    .populate('product')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "상품이 없습니다."
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



//장바구니 전체조회
router.get("/", (req, res, next) => {
  userName.find()
    .select("product _id")


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
            request: {
              type: "GET",
              url: "http://34.210.228.81:3000/user_shopping/" + doc._id
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


// 장바구니 담기 기능
router.post("/", (req, res, next) => {

  // 입력한 아이디 값이 Product에 존재하지 않을 경우 에러 발생
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "존재하지 않는 상품입니다."
        });
      }
      const order = new userName({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "장바구니에 저장하였습니다.",
        createdOrder: {
          _id: result._id,
          product: result.product,
        },
        request: {
          type: "GET",
          url: "http://34.210.228.81:3000/user_shopping/" + result._id
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


// 장바구니 물품삭제
router.delete("/:userName_ID", (req, res, next) => {
  userName.remove({ _id: req.params.userName_ID })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "장바구니 물품을 제거했습니다.",
        request: {
          type: "DELETE",
          url: "http://34.210.228.81:3000/user_shopping/",
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


// 장바구니 물품 전체삭제
router.delete("/", (req, res, next) => {
  userName.remove({})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "장바구니를 모두 제거했습니다.",
        request: {
          type: "DELETE",
          url: "http://34.210.228.81:3000/user_shopping/",
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
