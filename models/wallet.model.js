const mongoose = require("mongoose");
const { Schema } = mongoose;

const WalletSchema = new Schema({
  name: {
    type: String,
    default: "Sin Nombre",
  },
  description: {
    type: String,
    default: "Sin descripcion",
  },
  currency: {
    type: String,
    enum: ["usd", "eur", "ars", "brl"],
    default: "ars",
  },
  balance: {
    type: Number,
    default: 0,
  },
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

module.exports = mongoose.model("Wallet", WalletSchema);
