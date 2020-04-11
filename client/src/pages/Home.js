import React, { useState } from "react";

import WalletsContainer from "../components/WalletsContainer";
import TitleContainer from "../components/TitleContainer";
import TitleAndSubtitle from "../components/TitleAndSubtitle";

import BalanceCard from "../components/MonthBalance";
import Expenses from "../components/Expenses";
// import { Container } from './styles';

const ShowWallets = ({ userInfo }) => (
  <React.Fragment>
    <TitleContainer username={userInfo.username} />
    <TitleAndSubtitle
      title="Cuentas"
      subtitle="Seleccione una para ver el estado"
    />
    {userInfo.expenses && <WalletsContainer {...userInfo} />}
  </React.Fragment>
);

const ShowWalletDetails = ({ userInfo }) => (
  <React.Fragment>
    {userInfo.expenses && (
      <BalanceCard wallet={userInfo.wallet} expenses={userInfo.expenses} />
    )}
    {userInfo.expenses && <Expenses expenses={userInfo.expenses} />}
  </React.Fragment>
);

const Home = ({ userInfo }) => {
  /* 1. no me muestres nada, solo detalles */
  const [walletId, setwalletId] = useState("bda");

  /* 2. Mostrar todas las carteras SI walletId='' */
  if (walletId) {
    return <div>Cartera id:{walletId}</div>;
  } else {
    return <ShowWallets userInfo={userInfo} />;
  }
};

export default Home;
