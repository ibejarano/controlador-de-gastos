require("dotenv").config();

let PORT = process.env.PORT || 5000;

module.exports = {
  PORT,
  MONGO_URI: process.env.MONGO_URI,
};
