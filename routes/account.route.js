const express = require("express");

const router = express.Router();

const controller = require("../controllers/account.controller");
const authMiddleWare = require("../middleware/auth.middleware");
router.post("/create", controller.createAccount);

router.patch("/update/:id", controller.updateAccount);

router.delete(
  "/delete/:id",
  authMiddleWare.authMiddleWare,
  controller.deleteAccount
);

module.exports = router;
