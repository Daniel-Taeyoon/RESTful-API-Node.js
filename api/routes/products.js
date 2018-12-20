
// 쇼핑목록 추가 및 검색 기능

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },

  filename: function(req, file, cb) {
    cb(null, new Date().toISOString()+"_"+file.originalname);
  }

});


// 파일을 거부하기 위한 코드
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


// 사진 이미지 업로드를 지정할 수 있다.
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



const Product = require("../models/product");


// 상품 리스트 조회 기능 (즉, 상품 전체 조회기능)
router.get("/", (req, res, next) => {
  Product.find()
    .select("_id name price productImage detail")
    .exec()
    .then(docs => {
      const response ={
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            detail: doc.detail,

            request: {
              type: "GET",
              url: "http://34.210.228.81:3000/products/"+doc._id
            }

          };
        })
      };
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



// 해당 ID의 데이터를 전송하기 위한 메소드 (즉, 상품 검색기능)
router.get("/:search_name", (req, res, next) => {

  // 변수 id로 데이터를 전달 받는다.
  const search = req.params.search_name;

  // 검색 기능
  Product.find({
    name: {
      $regex: new RegExp(search)
    }
  }, {
    _id: 0,
    __v: 0
  }, function(err, data){
    res.json(data);
  })


});



// post 메소드로 데이털르 전송했을 시 데이터베이스에 저장되는 코드(즉, 상품추가 기능)
router.post("/", upload.single('productImage'), (req, res, next) => {

  // Product(models/product)에 전달받은 값을 저장한다.
  const product = new Product({

    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
    detail: req.body.detail

  });

  // MongoDB에 성공적으로 저장되었을 경우 결과 값을 출력해준다.
  // 만약 저장되지 않았을 경우 ' 500 ' 포트 번호로 오류 값을 출력한다.
  product
    .save()
    .then(result => {
      console.log(result);

      res.status(201).json({
        message: "성공적으로 Product가 저장되었습니다.",
        createdProduct: {

          _id: result._id,
          name: result.name,
          price: result.price,
          productImage: result.productImage,
          detail: result.detail,

          request: {
            type: 'POST',
            url : 'http://34.210.228.81:3000/products/'+result._id
          }
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





// 해당 ID의 데이터의 값을 수정할 수 있게 메소드 (즉, 상품내용 수정기능)
router.patch("/:productId", (req, res, next) => {

  const id = req.params.productId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product 수정',
        request: {
          type: 'GET',
          url: 'http://34.210.228.81:3000/products/'+id
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


// 해당 ID의 데이터를 삭제하는 메소드 (즉, 삭제기능)
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product 삭제됨',
        request: {
          type: 'POST',
          url: 'http://34.210.228.81:3000/products',
          body: {name: 'String', price: 'Number'}
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

module.exports = router;
