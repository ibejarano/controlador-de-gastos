const express = require("express");
const router = express.Router();
const { User } = require("../controllers");

router.get("/", User.getByCookie);

router.put("/", User.updateUser);

router.put("/:id/:wallet", User.addWallet);

router.get("/logout", User.logout);

router.get("/wallets", User.getWalletsId);

router.post("/new-section", User.createSection);

router.post("/budget-limit", User.setBudgetLimit)

router.delete("/", User.deleteUser);

/* Expense related routes */

module.exports = router;
