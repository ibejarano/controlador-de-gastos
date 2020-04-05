const express = require("express");
const router = express.Router();
const { User, Expense, Wallet } = require("../controllers");

router.get("/", User.getAll);

router.get("/:id", User.getOne);

router.post("/register", User.registerNewUser);

router.put("/", User.updateUser);

router.put('/:id/new-expense', Expense.registerExpense, Wallet.computeExpense , User.addExpense)

router.put("/:id/:wallet", User.addWallet ) /* Reemplazar por logida de arriba

router.delete("/", User.deleteUser);

/* Expense related routes */



module.exports = router;
