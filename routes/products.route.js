const express = require("express");

const router = express.Router();

const multer = require("multer");
// const storageMulter = require("../helpers/storageMulter");

const upload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const uploadCloud = require("../middleware/uploadCloud.middleware");
cloudinary.config({
  cloud_name: "dhvyer5es",
  api_key: "865256347474483",
  api_secret: "xepiZMsmuMbFBDPN9JuTh0KO96Y",
});

const productController = require("../controllers/product.controller");

// Thêm
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadFile,
  productController.createProduct
);

// Sửa
router.patch("/update/:id", productController.updateProduct);

// Xóa mềm (Chỉ thay đổi trường deleted)
router.patch("/delete/:id", productController.deleteProduct);

// Chi tiết sản phẩm
router.get("/detail/:id", productController.detailProduct);

// Danh sách sản phẩm
router.get("/products", productController.products);

module.exports = router;
