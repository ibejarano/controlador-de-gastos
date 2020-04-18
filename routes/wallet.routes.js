const express = require("express");
const { Wallet, Expense, User } = require("../controllers");

const router = express.Router();

router.get("/:id", Wallet.getWalletInfo);

router.post("/new/:id", Wallet.newWallet, User.addWallet);

router.put('/:id/new-expense', Expense.registerExpense, Wallet.addExpense)

router.put("/:id", Wallet.updateWalletBalance);

router.delete("/:id", Wallet.deleteWallet )

module.exports = router;