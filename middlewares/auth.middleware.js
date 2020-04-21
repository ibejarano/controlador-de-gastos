const jwt = require("jsonwebtoken");

exports.AuthUser = async (req, res, next) => {
  try {
    const token = req.cookies["expenses-tracker-cookie"];
    if (!token) {
      throw new Error("Cookie no encontrada");
    }
    const data = jwt.verify(token, process.env.JWT_KEY);
    req.userId = data._id;
    next();
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};
