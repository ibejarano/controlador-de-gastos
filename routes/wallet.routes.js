const express = require("express");
const { Wallet } = require("../controllers");

const router = express.Router();

router.post("/new", Wallet.newWallet);

module.exports = router;
