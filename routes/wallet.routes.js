const express = require("express");
const { Wallet, User, Budget } = require("../controllers");

const router = express.Router();

router.get("/:id", Wallet.getWalletInfo);

router.post("/new", Wallet.newWallet, User.addWallet);

router.put("/:id/new-expense", Wallet.addExpense);

router.put("/:id", Wallet.updateWalletBalance);

router.delete("/:id", Wallet.deleteWallet);

module.exports = router;
