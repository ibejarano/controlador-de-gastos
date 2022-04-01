import React, { useState, useEffect } from "react";

import { useUser } from "../context/UserContext";
import WalletContainer from "../components/WalletContainer";
import WalletDetails from "../components/WalletDetails";

import { getWallets } from "../helpers/requests";

export default function HomePage() {
  const {
    user: { refresh, title, openWallet, walletId },
    dispatch,
  } = useUser();
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    async function fetchWallets() {
      const { data } = await getWallets();
      setWallets(data);
    }
    if (refresh) {
      fetchWallets();
      dispatch({ type: "update-wallet" });
    }
  }, [refresh, openWallet, dispatch]);
  return (
    <React.Fragment>
      {wallets && (
        <React.Fragment>
          {wallets.map((wallet) => (
            <WalletContainer key={wallet._id} wallet={wallet} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
