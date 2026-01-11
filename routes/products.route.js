const express = require("express");

const router = express.Router();

const multer = require("multer");
const storageMulter = require("../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const productController = require("../controllers/product.controller");

// Thêm
router.post(
  "/create",
  upload.single("thumbnail"),
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
