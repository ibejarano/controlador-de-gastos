// 1 Desde aqui unicamente puedo conectar a la base de datos
// 2 no tiene que haber ningun req res o algo que involucre a express
// 3 Manejo de errores, agregar algo para cuando estemos debugeando

const { User } = require("../models");

async function getAllUsers() {
  const users = await User.find();
  if (!users) {
    const err = new Error("No se pudo obtener ningun usuario");
    err.status = 404;
    throw err;
  }
  return users;
}

async function register(data) {
  const user = new User({ ...data });
  const saved = await user.save();
  const token = await saved.generateAuthToken();
  return { user: saved, token };
}

async function login(data) {
  const { email, password } = data;
  if (!email || !password) {
    const err = new Error("Email y/o password no fueron recibidos");
    err.status = 401;
    throw err;
  }
  const user = await User.authenticate(email, password);
  const token = await user.generateAuthToken();
  return { user, token };
}

module.exports = {
  getAllUsers,
  register,
  login,
};
