const { Budget } = require("../models");

async function create(section, limit, ownerId) {
  const budget = new Budget({ section, limit, ownedBy: ownerId });
  await budget.save();
  return budget;
}

async function deleteById(id) {
  await Budget.findByIdAndDelete(id);
  return "Presupuesto eliminado";
}

async function getAllByOwnerId(id) {
  const budgets = await Budget.find({ ownedBy: id });
  if (!budgets) {
    const error = new Error("No se encontro ningun presupuesto");
    error.status = 401;
    throw error;
  }
  return budgets;
}

async function changeLimit(id, newLimit) {
  const budget = await Budget.findByIdAndUpdate(id, { limit: newLimit });
  // returns an outdated budget
  return budget;
}

async function updateTracking(userId, section, value) {
  const budgets = await Budget.find({ ownedBy: userId });
  // Tengo que setear un unico budget para una determinada seccion
  if (!budgets[section]) {
    const error = new Error("Presupuesto no encontrado para esta seccion");
    error.status = 401;
    throw error;
  }
  budget[section].current += value;
  const savedBudget = await budget.save();
  return savedBudget;
}

module.exports = {
  create,
  getAllByOwnerId,
  changeLimit,
  deleteById,
  updateTracking,
};
