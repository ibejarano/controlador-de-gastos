const { User } = require("../models");

async function getAll(req, res) {
  try {
    const users = await User.find().populate("wallet");
    res.send(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function getOne(req, res, next) {
  try {
    if (!req.params.id) {
      throw new Error("ID de usuario debe ser provisto");
    }
    const users = await User.findById(req.params.id).populate("wallet");
    res.send(users);
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
    res.json({ data: user, message: "Nuevo usuario registrado!" });
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
      .cookie("expenses-tracker-cookie", token)
      .json({ data: user, message: "Login satisfactorio! Bienvenid@!" });
  } catch (err) {
    res.status(401).json(err.message);
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
    /* TODO  Viene de middleware cookie parser luego*/
    if (!req.params.id) {
      throw new Error("ID de usuario debe ser provisto");
    }
    const user = await User.findById(req.params.id);
    if (!req.walletId) {
      throw new Error("Id de billetera no provista");
    }
    user.wallet.push(req.walletId);
    await user.save();
    const resUser = await User.findById(req.params.id).populate("wallet");
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
  getAll,
  getOne,
  register,
  login,
  updateUser,
  addWallet,
  deleteUser,
};
