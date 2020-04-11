const mongoose = require("mongoose");
const { Schema } = mongoose;


const WalletSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    account: {
        tyoe: String,
        enum: ['cash', 'credit card', 'bank account']
    },
    balance: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        required: true
    },
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense"
        }
    ]
})

module.exports = mongoose.model('Wallet', WalletSchema);