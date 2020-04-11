const express = require("express");
const { Wallet, Expense } = require("../controllers");

const router = express.Router();

router.get("/:id", Wallet.getWalletInfo);

router.post("/new", Wallet.newWallet);

router.put('/:id/new-expense', Expense.registerExpense, Wallet.addExpense)

router.put("/:id", Wallet.updateWalletBalance);

router.delete("/id", Wallet.deleteWallet )

module.exports = router;