const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { MONGO_URI } = require("./config");
const { corsOptions } = require("./config/corsOptions");
const { UserRoutes, WalletRoutes, AuthRoutes } = require("./routes");
const { AuthUser } = require("./middlewares/auth.middleware");

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db!");
  })
  .catch(console.log);

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.use("/", AuthRoutes);
app.use("/", AuthUser);

app.use("/user", UserRoutes);
app.use("/wallet", WalletRoutes);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json(err.message);
});

/* iniciar servidor */

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is up and running on port: ${
      process.env.PORT || 5000
    } \n Running a in a ${process.env.NODE_ENV} build`
  );
});
