const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");

const upload = multer();
const cloudinary = require("cloudinary").v2;
const uploadCloud = require("../middleware/uploadCloud.middleware");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const ProductCategoryController = require("../controllers/product-category.controller.js");

router.post(
  "/create",
  upload.array("thumbnail", 2),
  uploadCloud.uploadFile,
  ProductCategoryController.create
);

router.patch("/update/:id", ProductCategoryController.update);

router.patch("/delete/:id", ProductCategoryController.delete);

router.post("/detail/:id", ProductCategoryController.detail);

router.post("/productCategories", ProductCategoryController.productCategories);

module.exports = router;
