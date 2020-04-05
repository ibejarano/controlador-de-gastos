const express = require("express");
const router = express.Router();
const { Expense } = require("../controllers");

/* Crear Gasto o ingreso */

router.post("/new", Expense.registerExpense);

/* Obtener todos los gastos de un usuario*/
router.get("/:id", Expense.getExpensesfromUser);

/* Obtener los gastos de una seccion */
router.get("/:id/:section", Expense.getExpensesfromUserAndSection);

/* Obtener los gastos de una billetera */
router.get("/:id/:wallet", Expense.getExpensesfromUserWallet);

/* Mover wallet del gasto */
router.put("/:id/:wallet1/:wallet2", Expense.moveExpenseToWallet);

/* Cambiar info que no sea wallet */
router.put("/:id", Expense.updateExpenseInfo);

/* Borrrar gasto */
router.delete("/:id", Expense.deleteExpense);
