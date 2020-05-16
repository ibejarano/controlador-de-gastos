const mongoose = require("mongoose");

const { Schema } = mongoose;

const BudgetSchema = new Schema({
  section: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ["ars", "usd", "eur", "brl"],
  },
});

module.exports = mongoose.model("Budget", BudgetSchema);
