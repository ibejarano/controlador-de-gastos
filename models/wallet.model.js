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
    }
})

module.exports = mongoose.model('Wallet', WalletSchema);