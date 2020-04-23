const { User } = require("../models");

async function get(req, res, next) {
  try {
    const user = await User.findById(req.userId).populate("wallet");
    res.send({ user });
  } catch (err) {
    // res.status(500).json(err.message);
    next(err);
  }
}

async function register(req, res) {
  /* TODO1 Encriptar password  */
  /*  form validation desde front end*/
  try {
    const user = new User({ ...req.body });
    await user.save();
    res.json({ user, message: "Nuevo usuario registrado!" });
  } catch (err) {
    res.status(401).json(err.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const token = await user.generateAuthToken();
    res
      .cookie("expenses-tracker-cookie", token, {
        httpOnly: true,
      })
      .json({ message: "Login satisfactorio! Bienvenid@!" });
  } catch (err) {
    res.status(401).json(err);
  }
}

async function logout(req, res) {
  try {
    const user = await User.findById(req.userId);
    user.token = "";
    await user.save();
    res.clearCookie("expenses-tracker-cookie").json("Logout satisfactorio!");
  } catch (err) {
    res.status(400).json(err.message);
  }
}

async function updateUser(req, res) {
  try {
    /* TODO  Viene de middleware cookie parser luego*/
    const userId = checkUserIdProvided(req);

    await User.findByIdAndUpdate(userId, { ...req.body });

    res.json("Usuario actualizado correctamente!");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function addWallet(req, res) {
  try {
    const user = await User.findById(req.userId);
    user.wallet.push(req.walletId);
    await user.save();
    const resUser = await User.findById(req.userId).populate("wallet");
    res.json({ walletId: req.walletId, userInfo: resUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    /* TODO  Viene de middleware cookie parser luego*/
    const userId = checkUserIdProvided(req);

    const isDeleted = await User.findByIdAndDelete(userId);
    if (!isDeleted) {
      throw new Error("ID no encontrado");
    }
    res.json("Usuario eliminado!");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

/*Helpers functions */

function checkUserIdProvided(clientReq) {
  const userId = clientReq.userId || clientReq.body.userId;
  if (!userId) {
    throw new Error("ID de usuario debe ser provisto");
  }
  /* Esta parte hasta middleware */
  if (clientReq.body.userId) {
    delete clientReq.body.userId;
  }
  return userId;
}

module.exports = {
  get,
  register,
  login,
  logout,
  updateUser,
  addWallet,
  deleteUser,
};
