const express = require("express");

const router = express.Router();

const controller = require("../controllers/account.controller");

router.post("/account", controller.createAccount);

module.exports = router;
