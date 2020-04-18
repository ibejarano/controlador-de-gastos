const jwt = require("jsonwebtoken");

exports.AuthUser = async (req, res, next) => {
  try {
    const token = req.cookies["expenses-tracker-cookie"];
    const data = jwt.verify(token, process.env.JWT_KEY);
    req.userId = data._id;
    next();
  } catch {
    res.status(404).json("Necesita estar logeado para continuar");
  }
};
