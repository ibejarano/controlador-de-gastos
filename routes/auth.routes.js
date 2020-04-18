const express = require("express");
const router = express.Router();
const { User } = require("../controllers");


router.post("/login", User.login);

router.post("/register", User.register);



module.exports = router;
