const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { PORT, MONGO_URI } = require("./config");
const { UserRoutes, WalletRoutes, AuthRoutes } = require("./routes");
const { AuthUser } = require("./middlewares/auth.middleware");

/* Conectar a db */
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db!");
  })
  .catch(console.log);

const app = express();

const corsOptions = {
  origin: ["http://localhost:5001"],
  methods: "GET,HEAD,POST,PATCH,DELETE,PUT,OPTIONS",
  credentials: true, // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.use("/", AuthRoutes);
app.use("/", AuthUser);

app.use("/user", UserRoutes);
app.use("/wallet", WalletRoutes);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(401).json(err.message);
});

/* iniciar servidor */

app.listen(PORT, () => {
  console.log(
    `Server is up and running on port: ${PORT} \n Running a in a ${process.env.NODE_ENV} build`
  );
});
