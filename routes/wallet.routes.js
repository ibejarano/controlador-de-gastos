const express = require("express");
const { Wallet } = require("../controllers");

const router = express.Router();

router.post("/new", Wallet.newWallet);

router.put('/:id/new-expense', Expense.registerExpense, Wallet.addExpense)

router.put("/:id", Wallet.updateWalletBalance);

router.delete("/id", Wallet.deleteWallet )

module.exports = router;