const whitelist =
  process.env.NODE_ENV == "development"
    ? ["http://192.168.0.153:3000", "http://localhost:3000"]
    : ["https://new-expenses-manager.herokuapp.com/"];

exports.corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
