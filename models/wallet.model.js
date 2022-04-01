const mongoose = require("mongoose");
const { Schema } = mongoose;

const WalletSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Sin descripcion",
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
