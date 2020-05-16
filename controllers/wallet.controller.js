const { Wallet } = require("../models");
const { WalletServices, UserServices } = require("../services");

async function getWalletInfo(req, res, next) {
  try {
    const { id } = req.params;
    const { section } = req.query;
    const wallet = await WalletServices.getById(id, section);
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
    const expensesData = req.body;
    const wallet = await WalletServices.createExpense(expensesData, walletId);
    const budget = await UserServices.updateBudget(req.userId, expensesData);
    res.status(201).json({ wallet, budget });
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
