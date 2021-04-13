const { User } = require("../models");
const { UserServices, WalletServices } = require("../services");

const COOKIENAME = "controlador-gastos-ib";
const COOKIESETTINGS = {
  httpOnly: true,
};

async function get(req, res, next) {
  try {
    const users = await UserServices.getAllUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
}

async function getWallets(req, res, next) {
  try {
    const {
      user: { wallets },
    } = await UserServices.getWallets(req.userId);
    res.send(wallets);
  } catch (err) {
    next(err);
  }
}

async function getBudgets(req, res, next) {
  try {
    const { budgets } = await UserServices.getBudgets(req.userId);
    res.send(budgets);
  } catch (err) {
    next(err);
  }
}

async function getWalletsId(req, res, next) {
  try {
    const { wallets, sectionsSaved } = await UserServices.getWalletsId(
      req.userId
    );
    res.json({ wallets, sectionsSaved });
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const sectionsDefault = [
      "general",
      "comida",
      "hogar",
      "viajes",
      "servicios",
    ];
    req.body.sectionsSaved = sectionsDefault;
    req.body.budgets = sectionsDefault.map((section) => ({ section }));
    const { user, token } = await UserServices.register(req.body);
    res.cookie(COOKIENAME, token, COOKIESETTINGS).status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { user, token } = await UserServices.login(req.body);
    res.cookie(COOKIENAME, token, COOKIESETTINGS).status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res) {
  res.clearCookie(COOKIENAME).json("Logout satisfactorio!");
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

async function addWallet(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    console.log(user);
    console.log(req.walletId);
    user.wallets.push(req.walletId);
    await user.save();
    const resUser = await User.findById(req.userId).populate("wallet");
    res.json({ walletId: req.walletId, userInfo: resUser });
  } catch (error) {
    next(error);
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

async function setBudgetLimit(req, res, next) {
  try {
    const { section, limit } = req.body; // TODO: Se puede colocar todo en realidad para que updatee
    const user = await UserServices.setBudgetLimit(req.userId, section, limit);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function createSection(req, res, next) {
  try {
    const { section } = req.query;
    if (!section) {
      throw new Error("Seccion indefinida");
    }
    const user = await UserServices.createSection(section, req.userId);
    res.json(user);
  } catch (error) {
    next(error);
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
  getWallets,
  getBudgets,
  register,
  login,
  logout,
  updateUser,
  addWallet,
  deleteUser,
  createSection,
  getWalletsId,
  setBudgetLimit,
};
