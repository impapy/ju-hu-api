const router = require("express").Router();
const seller = require("../controller/seller.controller");
const verfiy = require("../controller/verifyTokenapi.controller.js");
const products = require("../controller/product.controller.js")
const express = require('express');
const path = require('path');
const {upload}= require('../helpers/filehelper');



// router.post("/addproduct", express.static(path.join(__dirname, 'uploads')), upload.array('files'),verfiy.verifyTokenAndAuthorization, products.createProduct);
// router.get("/", verfiy.verifyTokenAndAdmin, seller.getAdminOrders);
// router.get("/sellerOrders/:id", verfiy.verifyTokenAndAdmin, seller.getsellerOrders);
// router.get("/getSellers", verfiy.verifyTokenAndAdmin, seller.getAllSellers);
// router.post("/model",  products.AddmodelElec);
// router.put("/up/mod/:id",products.ubdateModel);

// router.get("/sellerProd", verfiy.verifyTokenAndAuthorization, seller.getProductSeller);
// router.put("/delProd/:id", verfiy.verifyTokenAndAuthorization, seller.deleteProductSeler);
// router.get("/getProd/:id", verfiy.verifyTokenAndAuthorization, seller.getProductdetails);
// router.put("/updatePro/:id", verfiy.verifyTokenAndAuthorization, express.static(path.join(__dirname, 'uploads')), upload.array('files'), seller.updateProduct);
// router.get("/getRev/:id", verfiy.verifyTokenAndAuthorization, seller.getProductReviews);
// router.put("/:productId/:reviewId", seller.deleteReview);  
// router.get("/getSingleOrder/:id", verfiy.verifyTokenAndAuthorization, seller.getAdminsingleOrders);

router.post("/addproduct", express.static(path.join(__dirname, 'uploads')), upload.array('files'), products.createProduct);
router.get("/", seller.getAdminOrders);
router.get("/sellerOrders/:id", seller.getsellerOrders);
router.get("/getSellers", seller.getAllSellers);
router.post("/model",  products.AddmodelElec);
router.put("/up/mod/:id",products.ubdateModel);

router.get("/sellerProd", seller.getProductSeller);
router.put("/delProd/:id", seller.deleteProductSeler);
router.get("/getProd/:id", seller.getProductdetails);
router.put("/updatePro/:id", express.static(path.join(__dirname, 'uploads')), upload.array('files'), seller.updateProduct);
router.get("/getRev/:id", seller.getProductReviews);
router.put("/:productId/:reviewId", seller.deleteReview);  
router.get("/getSingleOrder/:id", seller.getAdminsingleOrders);



module.exports = router;