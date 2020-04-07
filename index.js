const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT, MONGO_URI } = require("./config");
const { User, Wallet } = require("./models");
const { UserRoutes, WalletRoutes } = require("./routes");

/* Conectar a db */
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db!");
  })
  .catch(console.log);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", UserRoutes);
app.use("/wallet", WalletRoutes);

app.use((err,req,res,next)=>{
  console.log(err.message);
  res.status(401).json(err.message)
})

/* iniciar servidor */

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
