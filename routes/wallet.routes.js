const express = require("express");
const { Wallet } = require("../controllers");

const router = express.Router();

router.get("/:id", Wallet.getWalletInfo);

router.post("/new", Wallet.newWallet);

router.put("/:id/new-expense", Wallet.addExpense);

router.put("/:id/change-name", Wallet.changeName);

router.put("/:id", Wallet.updateWalletBalance);

router.delete("/:id", Wallet.deleteWallet);

module.exports = router;
