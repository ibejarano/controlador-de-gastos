const mongoose = require("mongoose");
const { Schema } = mongoose;

const WalletSchema = new Schema({
  name: {
    type: String,
    default: "Sin Nombre"
  },
  description: {
    type: String,
  },
  currency: {
    type: String,
    enum: ["usd", "eur", "ars", "brl"],
    default: "ars"
  },
  balance: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Wallet", WalletSchema);
