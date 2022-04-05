import React, { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { getWallets, deleteWallet } from "../helpers/requests";
import { toast } from "react-toastify";

function WalletItem({ _id, name, setWallets }) {
  const handleDelete = async () => {
    if (window.confirm(`Eliminar billetera ${name}?`)) {
      const { data } = await deleteWallet(_id);
      setWallets(data);
      toast.success("Billetera eliminada");
    }
  };

  return (
    <li action={handleDelete} icon={faTrash}>
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
          {wallets.map((wallet) => (
            <WalletItem key={wallet._id} setWallets={setWallets} {...wallet} />
          ))}
        </ul>
      )}
    </React.Fragment>
  );
}
