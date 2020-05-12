const express = require("express");
const router = express.Router();
const { User } = require("../controllers");

router.get("/", User.get);

router.put("/", User.updateUser);

router.put("/:id/:wallet", User.addWallet);

router.get("/logout", User.logout);

router.post("/new-section", User.createSection);

// router.delete("/", User.deleteUser);

/* Expense related routes */

module.exports = router;
