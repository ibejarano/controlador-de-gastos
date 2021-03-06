const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      autopopulate: true,
    },
  ],
  sectionsSaved: [
    {
      type: String,
      default: "General",
      required: true,
    },
  ],
  budgets: [
    {
      section: String,
      limit: {
        type: Number,
        default: 0,
      },
      current: { type: Number, default: 0 },
      isConfigured: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

UserSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

UserSchema.statics.authenticate = async (email, password) => {
  const user = await User.findOne({ email }).select("_id password");
  if (!user) {
    const err = new Error("Usuario y/o password invalido");
    err.status = 401;
    throw err;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    const err = new Error("Usuario o password invalido");
    err.status = 401;
    throw err;
  }
  const verifiedUser = await User.findById(user._id).select(
    "_id username sectionsSaved"
  );
  return verifiedUser;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
