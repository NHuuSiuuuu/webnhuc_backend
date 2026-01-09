const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

// Thêm
router.post("/create", productController.createProduct);

// Sửa
router.patch("/update/:id", productController.updateProduct);

// Xóa mềm (Chỉ thay đổi trường deleted)
router.patch("/delete/:id", productController.deleteProduct);

// Chi tiết sản phẩm
router.get("/detail/:id", productController.detailProduct);

// Danh sách sản phẩm
router.get("/products", productController.products);

module.exports = router;
