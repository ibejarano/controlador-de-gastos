const express = require("express");
const { Wallet, Expense, User, Budget } = require("../controllers");

const router = express.Router();

router.get("/:id", Wallet.getWalletInfo);

router.post("/new", Wallet.newWallet, User.addWallet);

router.put(
  "/:id/new-expense",
  Expense.registerExpense,
  Wallet.addExpense,
  Budget.updateSection
);

router.put("/:id", Wallet.updateWalletBalance);

router.delete("/:id", Wallet.deleteWallet);

module.exports = router;
