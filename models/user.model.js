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
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  wallet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: false,
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
  const user = await User.findOne({ email }).populate('wallet');
  if (!user) {
    throw new Error("Invalid user");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }
  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.token = token;
  await user.save();
  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
