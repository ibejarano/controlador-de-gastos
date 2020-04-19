const express = require("express");
const router = express.Router();
const { User } = require("../controllers");

router.get("/", User.get);

router.put("/", User.updateUser);

router.put("/:id/:wallet", User.addWallet);

/* Reemplazar por logida de arriba */

router.post("/logout", User.logout);

// router.delete("/", User.deleteUser);

/* Expense related routes */

module.exports = router;
