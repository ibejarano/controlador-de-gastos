import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import WalletsContainer from "../components/WalletsContainer";
import TitleContainer from "../components/TitleContainer";
import TitleAndSubtitle from "../components/TitleAndSubtitle";

import BalanceCard from "../components/MonthBalance";
import Expenses from "../components/Expenses";
// import { Container } from './styles';

const ShowWallets = ({ userInfo, setWalletId }) => (
  <React.Fragment>
    <TitleContainer username={userInfo.username} />
    <TitleAndSubtitle
      title="Cuentas"
      subtitle="Seleccione una para ver el estado"
    />
    {userInfo.expenses && (
      <WalletsContainer wallet={userInfo.wallet} setWalletId={setWalletId} />
    )}
  </React.Fragment>
);

const StyledWalletDetails = styled.div`
  background: ${(props) => props.theme.color.walletColor};
  border-radius: 3em;
  padding: 24px;
  margin-left: 0 !important ;
  margin-right: 0 !important ;
  height: 100vh;
  position: relative;

  button {
    position: absolute;
    right: 1em;
    top: 1em;
    background: none;
    color: ${(props) => props.theme.color.yellowText};
    border: none;
    font-weight: bold;
    font-size: 1.5em;
    transition: transform .2s ease-in-out;
  }
  button:hover {
    transform: scale(1.4);
  }
`;

const ShowWalletDetails = ({ wallet, removeWalletId }) => {
  return (
    <React.Fragment>
      <TitleContainer walletName={wallet.name} />
      <StyledWalletDetails>
        {wallet.expenses && <BalanceCard wallet={wallet} />}
        {wallet.expenses && <Expenses expenses={wallet.expenses} />}
        <button onClick={() => removeWalletId("")}>X</button>
      </StyledWalletDetails>
    </React.Fragment>
  );
};

const Home = ({ userInfo }) => {
  /* 1. no me muestres nada, solo detalles */
  const [walletId, setWalletId] = useState("");
  const [wallet, setWallet] = useState({});
  /* 2. Mostrar todas las carteras SI walletId='' */

  /* 3. Si selecciono walletId hacer un fetch al servidor */
  useEffect(() => {
    if (walletId) {
      axios
        .get(`http://localhost:5000/wallet/${walletId}`)
        .then(({ data }) => setWallet(data))
        .catch(console.log);
    }
  }, [walletId]);

  if (walletId) {
    return <ShowWalletDetails wallet={wallet} removeWalletId={setWalletId} />;
  } else {
    return <ShowWallets userInfo={userInfo} setWalletId={setWalletId} />;
  }
};

export default Home;
