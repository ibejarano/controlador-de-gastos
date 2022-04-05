// 1 Desde aqui unicamente puedo conectar a la base de datos
// 2 no tiene que haber ningun req res o algo que involucre a express
// 3 Manejo de errores, agregar algo para cuando estemos debugeando

const { User } = require("../models");

async function getWallets(id) {
  const user = await User.findById(id)
    .select("wallets")
    .populate({
      path: "wallets",
      populate: {
        path: "expenses",
      },
    });
  return { user };
}

async function getBudgets(id) {
  const { budgets } = await User.findById(id).select("budgets");
  return { budgets };
}

async function getAllUsers() {
  const users = await User.find();
  if (!users) {
    const err = new Error("No se pudo obtener ningun usuario");
    err.status = 404;
    throw err;
  }
  return users;
}

async function register(data) {
  const user = new User({ ...data });
  const saved = await user.save();
  const token = await saved.generateAuthToken();
  return { user: saved, token };
}

async function login(data) {
  const { email, password } = data;
  if (!email || !password) {
    const err = new Error("Email y/o password no fueron recibidos");
    err.status = 401;
    throw err;
  }
  const user = await User.authenticate(email, password);
  const token = await user.generateAuthToken();
  return { user, token };
}

async function createSection(section, id) {
  const user = await User.findById(id);
  if (user.sectionsSaved.includes(section.toLowerCase())) {
    const error = new Error("Esta seccion ya existe");
    error.status = 400;
    throw error;
  }
  user.sectionsSaved.push(section.toLowerCase());
  await user.save();
  return user;
}

async function getSectionsSaved(id) {
  const { sectionsSaved } = await User.findById(id);
  return sectionsSaved;
}

async function getWalletsId(id) {
  const { wallets, sectionsSaved } = await User.findById(id);
  return { wallets, sectionsSaved };
}

async function addWallet(id, walletId) {
  const user = await User.findByIdAndUpdate(
    id,
    { $push: { wallets: walletId._id } },
    { new: true }
  ).populate("wallets");
  return user;
}

async function getBudget(userId, name) {
  const { budgets } = await User.findById(userId, "budgets");
  if (!budgets) {
    const error = new Error("No existen presupuestos");
    error.status = 500;
    throw error;
  }
  let budget;
  budgets.forEach((b) => {
    if (b.section == name) {
      budget = b;
    }
  });
  if (!budget) {
    budget = "No se encontro presupuesto para esta seccion";
  }
  return budget;
}

async function setBudgetLimit(userId, sectionName, limit) {
  const user = await User.findById(userId, "budgets");
  if (!user.budgets) {
    const error = new Error("No existen presupuestos");
    error.status = 500;
    throw error;
  }
  user.budgets.forEach((b) => {
    if (b.section == sectionName) {
      b.limit = limit;
      b.isConfigured = true;
    }
  });

  await user.save();

  return user;
}

async function updateBudget(userId, expenses) {
  const user = await User.findByIdAndUpdate(userId);
  const sectionName = expenses.section;
  const indexOfBudget = user.budgets.findIndex((b) => b.section == sectionName);
  if (indexOfBudget < 0) {
    return {};
  }
  const amount = parseInt(expenses.amount);
  user.budgets[indexOfBudget].current += amount;

  await user.save();
  return user.budgets[indexOfBudget];
}

module.exports = {
  getAllUsers,
  register,
  login,
  getWallets,
  getBudgets,
  createSection,
  getSectionsSaved,
  getWalletsId,
  getBudget,
  updateBudget,
  setBudgetLimit,
  addWallet,
};
