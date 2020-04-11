const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        required: false
    }]
})

module.exports = mongoose.model('User', UserSchema)