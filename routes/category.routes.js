
const category = require("../controller/category.controller.js");
const router = require("express").Router();
const verify = require("../controller/verifyTokenapi.controller.js");
const express = require('express');
const path = require('path');
const { upload } = require('../helpers/filehelper');
// //CREATE
// router.post("/", verify.verifyTokenAndAdmin, express.static(path.join(__dirname, 'uploads')), upload.array('files'), category.createCategory)

// //UPDATE
// // router.put("/:id",  category.updateCategory);
// router.put("/:id" ,express.static(path.join(__dirname, 'uploads')), upload.array('files'),  category.updateCategory);

// //DELETE
// router.delete("/:name", verify.verifyTokenAndAdmin, category.deleteCategory);
// router.delete("/SubCategory/:name",  category.deleteSubCategory);

// //GET ALL CATEGORIES
// router.get("/", category.getAllCategory);

// //GET CATEGORY BY NAME
// router.get("/speciefic/:categoryName", category.getCategoryByName);
// router.get("/Admin/speciefic/:categoryName", category.getCategoryByNameForAdmin);
// router.get("/Admin/SubCategory/:id", category.getSubCategoryByIdForAdmin );
// // router.put("/SubCategory/:id",  category.updateSubCategoryByIdForAdmin);

// //GET SUBCATEGORIES OF SPECIEFIC CATEGORY
// router.get("/:categoryName", category.getSubCategories);

// router.post("/pagination", verify.verifyTokenAndAdmin, category.getAllCategorypagination);
// router.get("/getall/Admin", category.getAllCategoryAdmin);
// router.post("/Admin", express.static(path.join(__dirname, 'uploads')), upload.array('files'), category.createCategoryByAdmin);
// router.put("/SubCategory/:id" ,express.static(path.join(__dirname, 'uploads')), upload.array('files'),  category.updateSubCategoryByIdForAdmin);



//CREATE

router.post("/", express.static(path.join(__dirname, 'uploads')), upload.array('files'), category.createCategory)

//UPDATE
// router.put("/:id",  category.updateCategory);
router.put("/:id" ,express.static(path.join(__dirname, 'uploads')), upload.array('files'),  category.updateCategory);

//DELETE
router.delete("/:name", category.deleteCategory);
router.delete("/SubCategory/:name",  category.deleteSubCategory);

//GET ALL CATEGORIES
router.get("/", category.getAllCategory);
router.get("/supCategory/:categoryId", category.getCategorySupCategory);

//GET CATEGORY BY NAME
router.get("/speciefic/:categoryName", category.getCategoryByName);
router.get("/Admin/speciefic/:categoryName", category.getCategoryByNameForAdmin);
router.get("/Admin/SubCategory/:id", category.getSubCategoryByIdForAdmin );
// router.put("/SubCategory/:id",  category.updateSubCategoryByIdForAdmin);

//GET SUBCATEGORIES OF SPECIEFIC CATEGORY
router.get("/:categoryName", category.getSubCategories);

router.post("/pagination", category.getAllCategorypagination);
router.get("/getall/Admin", category.getAllCategoryAdmin);
router.post("/Admin", express.static(path.join(__dirname, 'uploads')), upload.array('files'), category.createCategoryByAdmin);
router.put("/SubCategory/:id" ,express.static(path.join(__dirname, 'uploads')), upload.array('files'),  category.updateSubCategoryByIdForAdmin);






module.exports = router;