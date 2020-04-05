const express = require("express");
const { Wallet } = require("../controllers");

const router = express.Router();

router.post("/new", Wallet.newWallet);

router.put("/:id", Wallet.updateWalletBalance);

router.delete("/id", Wallet.deleteWallet )

module.exports = router;
