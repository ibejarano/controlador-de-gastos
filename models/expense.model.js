const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    default: "General",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
