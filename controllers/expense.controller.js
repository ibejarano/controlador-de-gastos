const { Expense } = require("../models");

async function registerExpense(req, res, next) {
  try {
    const expense = new Expense({ ...req.body });
    await expense.save();
    req.expenseNetAmount = req.body.isIncome ? req.body.amount : - req.body.amount
    req.expenseId = expense.id;
    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function getExpensesfromUser(req, res) {}

async function getExpensesfromUserAndSection(req, res) {}

async function getExpensesfromUserWallet(req, res) {}

async function moveExpenseToWallet(req, res) {}

async function updateExpenseInfo(req, res) {}

async function deleteExpense(req, res) {}

module.exports = {
  registerExpense,
  getExpensesfromUser,
  getExpensesfromUserAndSection,
  getExpensesfromUserWallet,
  moveExpenseToWallet,
  updateExpenseInfo,
  deleteExpense,
};
