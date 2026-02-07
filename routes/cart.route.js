const express = require("express");

const router = express.Router();
const controller = require("../controllers/cart.controller");

router.post("/create", controller.createCart);
router.post("/get", controller.getCart);
router.post("/delete", controller.deleteProductInCart);
router.post("/update", controller.updateProductInCart);

module.exports = router;
