const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { PORT, MONGO_URI } = require("./config");
const {
  UserRoutes,
  WalletRoutes,
  AuthRoutes,
  BudgetRoutes,
} = require("./routes");
const { AuthUser } = require("./middlewares/auth.middleware");

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db!");
  })
  .catch(console.log);

const app = express();

const ORIGIN_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://new-expenses-manager.herokuapp.com/";

const corsOptions = {
  origin: [ORIGIN_URL],
  methods: "GET,HEAD,POST,PATCH,DELETE,PUT,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

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
app.use("/budget", BudgetRoutes);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json(err.message);
});

/* iniciar servidor */

app.listen(PORT, () => {
  console.log(
    `Server is up and running on port: ${PORT} \n Running a in a ${process.env.NODE_ENV} build`
  );
});
