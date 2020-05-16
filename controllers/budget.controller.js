const { BudgetServices } = require("../services");

async function getAllByOwner(req, res, next) {
  try {
    const ownerId = req.userId;
    const budgets = await BudgetServices.getAllByOwnerId(ownerId);
    res.json(budgets);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { section, limit, currency } = req.body;
    const budget = await BudgetServices.create(section, limit, currency );
    req.budgetId = budget._id;
    next();
  } catch (error) {
    next(error);
  }
}

async function deleteById(req, res, next) {
  try {
    const { id } = req.params;
    const message = await BudgetServices.deleteById(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}

async function updateLimit(req, res, next) {
  try {
    const { id } = req.params;
    const { limit } = req.body;
    const budget = await BudgetServices.changeLimit(id, limit);
    res.json(budget);
  } catch (error) {
    next(error);
  }
}

async function updateSection(req, res, next) {
  try {
    const budget = await BudgetServices.updateTracking(
      req.userId,
      req.section,
      req.expenseNetAmount
    );
    if (budget) {
      req.messages.push("Presupuesto actualizado");
    }
    res.json(req.messages);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllByOwner,
  create,
  deleteById,
  updateLimit,
  updateSection,
};
