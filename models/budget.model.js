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
  current: {
    type: Number,
    default: 0,
  },
  ownedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Budget", BudgetSchema);
