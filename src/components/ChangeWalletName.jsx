import React, { useState, useEffect } from "react";

import { faPen } from "@fortawesome/free-solid-svg-icons";

import { getWallets, changeWalletName } from "../helpers/requests";
import { toast } from "react-toastify";

function WalletItem({ _id, name, setWallets, idx }) {
  const handleChange = async () => {
    const newName = window.prompt("Nuevo nombre", name);

    if (newName) {
      const { data } = await changeWalletName(_id, newName);
      setWallets((prev) => {
        prev[idx] = data;
        return [...prev];
      });
      toast.success("Nombre cambiado correctamente.");
    }
  };

  return (
    <li action={handleChange} icon={faPen}>
      {name}
    </li>
  );
}

export default function DeleteWallet() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    async function fetchWallets() {
      const { data } = await getWallets();
      setWallets(data);
    }

    fetchWallets();
  }, []);

  return (
    <React.Fragment>
      {wallets && (
        <ul>
          {wallets.map((wallet, idx) => (
            <WalletItem
              key={wallet._id}
              setWallets={setWallets}
              {...wallet}
              idx={idx}
            />
          ))}
        </ul>
      )}
    </React.Fragment>
  );
}
