const express = require("express");
const router = express.Router();
const { User } = require("../controllers");

router.get("/", User.getAll);

router.get("/:id", User.getOne);

router.post("/register", User.registerNewUser);

router.put("/", User.updateUser);

router.put("/:id/:wallet", User.addWallet )

router.delete("/", User.deleteUser);

module.exports = router;
