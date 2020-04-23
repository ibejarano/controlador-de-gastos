import axios from "axios";

const transport = axios.create({
  withCredentials: true,
});

export async function addWallet(fields) {
  try {
    const { data } = await transport.post(
      "http://localhost:5000/wallet/new",
      fields
    );
    return { data };
  } catch (err) {
    return { err };
  }
}

export async function getWalletDetails(walletId) {
  try {
    const { data } = await transport.get(
      `http://localhost:5000/wallet/${walletId}`
    );
    return { data };
  } catch (err) {
    return { err };
  }
}

export async function addExpense(walletId, fields) {
  try {
    const { data } = await transport.put(
      `http://localhost:5000/wallet/${walletId}/new-expense`,
      fields
    );
    return { data };
  } catch (err) {
    return { err };
  }
}

export async function login(input) {
  try {
    if (!input.email && !input.password) {
      throw new Error("Usuario y Password requeridos");
    }
    const { data } = await axios.post("http://localhost:5000/login", input);
    return { data };
  } catch (err) {
    if (err.message) {
      return { err };
    }
    return { err  };
  }
}

export async function logout() {
  try {
    const { data } = await transport.get("http://localhost:5000/user/logout");
    return { data };
  } catch (err) {
    return { err };
  }
}

export async function register(input) {
  try {
    if (input.password !== input.confPassword) {
      throw new Error("Los passwords no coinciden");
    }
    const { data, message } = await transport.post(
      "http://localhost:5000/register",
      input
    );
    return { data, message };
  } catch (err) {
    if (err.message) {
      return { err: err.message };
    }
    return { err: err.response.data.error };
  }
}
