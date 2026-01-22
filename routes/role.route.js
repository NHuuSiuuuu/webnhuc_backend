const express = require("express");

const router = express.Router();

const roleController = require("../controllers/role.controller");

router.get("/index", roleController.index);
router.get("/detail/:id", roleController.detail);
router.post("/create", roleController.create);
router.patch("/update/:id", roleController.update);
router.delete("/delete/:id", roleController.delete);

module.exports = router;
