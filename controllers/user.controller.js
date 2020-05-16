const { User } = require("../models");
const { UserServices, WalletServices, BudgetServices } = require("../services");

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

async function getByCookie(req, res, next) {
  try {
    const { user } = await UserServices.get(req.userId);
    res.send(user);
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
    const wallet = await WalletServices.create({});
    const sectionsDefault = [
      "general",
      "comida",
      "hogar",
      "viajes",
      "servicios",
    ];
    req.body.wallets = [wallet._id];
    const budgets = await Promise.all(
      sectionsDefault.map(
        async (section) => await BudgetServices.create(section)
      )
    );
    req.body.budgets = budgets;
    req.body.sectionsSaved = sectionsDefault;
    const { user, token } = await UserServices.register(req.body);
    user.wallets = [wallet];
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

async function addBudget(req, res, next) {
  try {
    const budgetId = req.budgetId;
    const user = await User.findById(req.userId);
    user.budgets.push(budgetId);
    await user.save();
    res.json({ data: user, message: "Presupuesto agregado!" });
  } catch (error) {
    next(error);
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
  getByCookie,
  register,
  login,
  logout,
  updateUser,
  addWallet,
  deleteUser,
  createSection,
  addBudget,
  getWalletsId,
};
