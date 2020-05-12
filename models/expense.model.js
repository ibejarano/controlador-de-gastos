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
  isIncome: {
    type: Boolean,
    default: false,
  },
  section: {
    type: String,
    default: "General",
  },
  doneBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fromWallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  },
  atDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
