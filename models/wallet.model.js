const mongoose = require("mongoose");
const { Schema } = mongoose;

const WalletSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  balance: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "ARS", "BRL"],
    required: true,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

module.exports = mongoose.model("Wallet", WalletSchema);
