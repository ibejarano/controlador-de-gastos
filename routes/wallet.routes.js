const express = require("express");
const { Wallet } = require("../models");

const router = express.Router();

router.post("/new", async (req, res) => {
  try {
    const { balance, name, account, currency, userId } = req.body;
    /* TODO Cambiar userId que luego venga por middleware */

    const wallet = new Wallet({
      balance,
      name,
      account,
      currency,
      owner: userId,
    });

    await wallet.save();
    res.json({message: "Billetera guardada!", walletId: wallet._id});
  } catch (error) {
    res.status(401).json(error.message);
  }
});

module.exports = router;
