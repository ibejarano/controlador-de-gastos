const { Wallet } = require("../models");
const { WalletServices } = require("../services");

async function getWalletInfo(req, res, next) {
  try {
    const { id } = req.params;
    const wallet = await WalletServices.getById(id);
    res.json(wallet);
  } catch (error) {
    next(error);
  }
}

async function newWallet(req, res, next) {
  try {
    const wallet = await WalletServices.create(req.body);
    req.walletId = wallet._id;
    next();
  } catch (error) {
    next(error);
  }
}

async function updateWalletBalance(req, res, next) {
  try {
    const { id } = req.params;
    const { amount } = req.bodyu;
    const wallet = await WalletServices.updateBalance(id, amount);
    res.json(wallet);
  } catch (error) {
    next(error);
  }
}

async function deleteWallet(req, res, next) {
  try {
    const { id } = req.params;
    const message = await WalletServices.deleteById(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}

async function addExpense(req, res, next) {
  try {
    const walletId = req.params.id;
    const expenseId = req.expenseId;
    const wallet = await WalletServices.updateBalance(
      walletId,
      req.expenseNetAmount,
      expenseId
    );
    if (!wallet) {
      req.messages.push("No se pudo actualizar la billetera");
    }
    req.messages.push("Billetera actualizada satisfactoriamente");
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  newWallet,
  updateWalletBalance,
  deleteWallet,
  addExpense,
  getWalletInfo,
};
