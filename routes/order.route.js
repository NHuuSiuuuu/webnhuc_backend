const express = require("express");

const router = express.Router();
const controller = require("../controllers/order.controller");

router.post("/create", controller.createOrder);

router.get("/index", controller.index);

router.get("/success/:id", controller.successOrder);

router.post("/tracking", controller.tracking);

module.exports = router;
