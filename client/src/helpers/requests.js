import axios from "axios";

const transport = axios.create({
  withCredentials: true,
});

export async function addWallet(fields) {
  console.log("pidiendoo");
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
