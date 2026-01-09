const express = require("express");
const router = express.Router();

const ProductCategoryController = require("../controllers/product-category.controller.js");

router.post("/create", ProductCategoryController.create);

router.patch("/update/:id", ProductCategoryController.update);

router.patch("/delete/:id", ProductCategoryController.delete);

router.post("/detail/:id", ProductCategoryController.detail);

router.post("/productCategories", ProductCategoryController.productCategories);

module.exports = router;
