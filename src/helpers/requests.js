import axios from "axios";

const endpoint =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_ENDPOINT
    : "http://localhost:5000";

const transport = axios.create({
  withCredentials: true,
});

export async function getWallets() {
  try {
    const { data } = await transport.get(`${endpoint}/user`);
    return { data };
  } catch (error) {
    return { err: error };
  }
}

export async function addWallet(fields) {
  try {
    const { data } = await transport.post(`${endpoint}/wallet/new`, fields);
    return { data };
  } catch (err) {
    return { err };
  }
}

export async function deleteWallet(walletId) {
  try {
    const { data } = await transport.delete(`${endpoint}/wallet/${walletId}`);
    return { data };
  } catch (err) {
    return { err };
  }
}

export async function getWalletDetails(walletId) {
  try {
    const { data } = await transport.get(`${endpoint}/wallet/${walletId}`);
    return { data };
  } catch (err) {
    return { err };
  }
}

export async function addExpense(walletId, fields) {
  try {
    const { data } = await transport.put(
      `${endpoint}/wallet/${walletId}/new-expense`,
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
    const { data } = await transport.post(`${endpoint}/login`, input);
    return { data };
  } catch (err) {
    if (err.message) {
      return { err };
    }
    return { err };
  }
}

export async function logout() {
  try {
    const { data } = await transport.get(`${endpoint}/user/logout`);
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
      `${endpoint}/register`,
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

export async function configureBudget(section, limit) {
  try {
    const { data } = await transport.post(`${endpoint}/user/budget-limit`, {
      section,
      limit,
    });
    return {
      data,
      message: `Presupuesto de la seccion ${section} actualizado correctamente`,
    };
  } catch (err) {
    if (err.message) {
      return { err: err.message };
    }
    return { err: err.response.data.error };
  }
}

export async function getBudgets() {
  try {
    const { data } = await transport.get(`${endpoint}/user/budgets`);
    return { data };
  } catch (err) {
    if (err.message) {
      return { err: err.message };
    }
    return { err: err.response.data.error };
  }
}
