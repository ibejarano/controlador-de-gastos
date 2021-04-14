const whitelist =
  process.env.NODE_ENV == "development"
    ? ["http://192.168.0.153:3000", "http://localhost:5000"]
    : ["https://new-expenses-manager.herokuapp.com/"];

exports.corsOptions = {
  origin: whitelist ,
  credentials: true,
};
