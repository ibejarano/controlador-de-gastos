import React, { useState, useEffect } from "react";

import { useUser } from "../context/UserContext";
import WalletContainer from "../components/WalletContainer";
import styled from "styled-components";
import TitleContainer from "../components/common/Title";
import TitleAndSubtitle from "../components/common/TitleAndSubtitle";
import WalletDetails from "../components/WalletDetails";

import { getWallets } from "../helpers/requests";

const StyledWallets = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;

  @media (min-width: 600px) {
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0 4em;
  }
`;

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
      <TitleContainer title={title} />
      <TitleAndSubtitle
        title="Cuentas"
        subtitle="Seleccione una para ver el estado"
      />
      {wallets &&
        <StyledWallets>
          {wallets.map((wallet) => (
            <WalletContainer
              key={wallet._id}
              wallet={wallet}
            />
          ))}
        </StyledWallets>
      }
      <WalletDetails walletId={walletId} />
    </React.Fragment>
  );
}
