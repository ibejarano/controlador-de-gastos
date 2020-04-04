const express = require("express");
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = require("./config");
const { User, Wallet } = require("./models");

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db!");
  })
  .catch(console.log);

const app = express();

// async function findUserAndSaveWallet(){
//     const user = await User.findById("5e88efb3bbb47051b0bacfd1").populate('wallet');
//     const wallet = new Wallet({
//         name: "Carterita Posta 2",
//         account: "casassdh",
//         currency: "ARS",
//         balance: 20000,
//     });
//     const savedWallet = await wallet.save();
//     user.wallet.push(savedWallet);
//     const newUser =  await user.save()
//     console.log(newUser.wallet)
// }

/* Conectar a db */

/* iniciar servidor */

app.listen( PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
