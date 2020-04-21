const { Wallet } = require("../models");

async function getWalletInfo(req, res) {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findById(id).populate("expenses");
    if (!wallet) {
      throw new Error("ID de Billetera no encontrada");
    }
    res.json(wallet);
  } catch (error) {
    res.json(error.message);
  }
}

async function newWallet(req, res, next) {
  try {
    const { balance, name, description, currency } = req.body;
    const wallet = new Wallet({
      balance,
      name,
      description,
      currency,
    });

    await wallet.save();
    req.walletId = wallet._id;
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
}

async function updateWalletBalance(req, res) {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findById(id);
    wallet.balance += parseInt(req.body.amount);
    await wallet.save();
    res.json("Balance actualizado");
  } catch (error) {
    res.json(error.message);
  }
}

async function deleteWallet(req, res) {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findByIdAndDelete(id);
    if (!wallet) {
      throw new Error("ID de Billetera no encontrada");
    }
    res.json("Billetera eliminada");
  } catch (error) {
    res.json(error.message);
  }
}

async function addExpense(req, res) {
  try {
    const walletId = req.params.id;
    const wallet = await Wallet.findById(walletId).populate("expenses");
    if (!wallet) {
      throw new Error("Id de Wallet no encontrada");
    }
    wallet.balance += req.expenseNetAmount;
    wallet.expenses.push(req.expenseId);
    await wallet.save();
    const updatedWallet = await Wallet.findById(walletId).populate("expenses");
    res.json({ wallet: updatedWallet, message: "Registro agregado" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
}

module.exports = {
  newWallet,
  updateWalletBalance,
  deleteWallet,
  addExpense,
  getWalletInfo,
};
