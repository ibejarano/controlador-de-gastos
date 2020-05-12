const express = require("express");
const router = express.Router();
const { Budget } = require("../controllers");

/* Crear Gasto o ingreso */
router.post("/new", Budget.create);

router.delete("/:id", Budget.deleteById);

router.put("/:id", Budget.updateLimit);

router.get("/", Budget.getAllByOwner);

module.exports = router;
