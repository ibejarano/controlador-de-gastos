const { Wallet, Expense } = require("../models");

async function getById(id, sectionName) {
  let wallet;
  if (sectionName) {
    wallet = await Wallet.findById(id).populate({
      path: "expenses",
      match: { section: sectionName },
    });
  } else {
    wallet = await Wallet.findById(id).populate("expenses");
  }
  if (!wallet) {
    throw new Error("ID de Billetera no encontrada");
  }
  return wallet;
}

async function createExpense(expenseData, walletId) {
  const expense = new Expense({ ...expenseData });
  await expense.save();
  const wallet = await Wallet.findByIdAndUpdate(
    walletId,
    {
      $push: { expenses: expense._id },
      $inc: { balance: expense.amount },
    },
    {
      new: true,
    }
  ).populate("expenses");
  return wallet;
}

async function create(data) {
  const { balance, name, description, currency } = data;
  const wallet = new Wallet({
    balance,
    name,
    description,
    currency,
  });
  const savedWallet = await wallet.save();
  return savedWallet;
}

async function updateBalance(id, amount, expensesId = null) {
  const wallet = await Wallet.findById(id).populate("expenses");
  wallet.balance += parseInt(amount);
  if (expensesId) {
    wallet.expenses.push(expenseId);
  }
  const savedWallet = await wallet.save();
  if (!wallet) {
    const error = new Error("Error al actualizar balance");
    error.status = 401;
    throw error;
  }
  return savedWallet;
}

async function changeName(id, name) {
  const wallet = await Wallet.findById(id);
  wallet.name = name
  const savedWallet = await wallet.save();
  if (!wallet) {
    const error = new Error("Error al actualizar balance");
    error.status = 401;
    throw error;
  }
  return savedWallet;
}

async function deleteById(id) {
  const wallet = await Wallet.findByIdAndDelete(id);
  if (!wallet) {
    const error = new Error("No se pudo eliminar la billetera");
    error.status = 404;
    throw error;
  }
  return "Billetera eliminada";
}

module.exports = {
  create,
  createExpense,
  getById,
  updateBalance,
  deleteById,
  changeName
};
