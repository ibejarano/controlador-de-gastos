const express = require("express");
const router = express.Router();
const { User } = require("../controllers");

router.get("/", User.getWallets);
router.get("/budgets", User.getBudgets);

router.put("/", User.updateUser);
router.put("/change-password", User.changePassword);

router.get("/logout", User.logout);

router.get("/wallets", User.getWalletsId);

router.post("/budget-limit", User.setBudgetLimit);

router.delete("/", User.deleteUser);

/* Expense related routes */

module.exports = router;
