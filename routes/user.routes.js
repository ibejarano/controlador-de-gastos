const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("wallet");
    res.json(users);
  } catch (err) {
    res.status(500).json("And error has ocurred! sorry");
  }
});

router.post("/register", async (req, res) => {
    console.log(req.body);
    /* TODO1 Encriptar password  */
    /*  form validation desde front end*/
    try {
        const user = new User({...req.body});
        await user.save()
        res.json('Nuevo usuario registrado!')
    } catch(err){
        res.status(401).json(err.message)
    }

});

module.exports = router;
