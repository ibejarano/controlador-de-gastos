import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import theme from "./themes/main";

import MainContainer from "./components/MainContainer";
import TitleContainer from "./components/TitleContainer";
import BalanceCard from "./components/MonthBalance";
import Expenses from "./components/Expenses";
import WalletsContainer from "./components/WalletsContainer";
import TitleAndSubtitle from "./components/TitleAndSubtitle";

import "./App.css";

const USERID_TEST = "5e89de48d8784a4727158acc";

function App() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${USERID_TEST}`)
      .then(({ data }) => setUserInfo(data))
      .catch(console.log);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <TitleContainer username={userInfo.username} />
        <TitleAndSubtitle
          title="Cuentas"
          subtitle="Seleccione una para ver el estado"
        />
        {userInfo.expenses && <WalletsContainer {...userInfo} />}
        {/* {userInfo.expenses && (
          <BalanceCard wallet={userInfo.wallet} expenses={userInfo.expenses} />
        )}
        {userInfo.expenses && <Expenses expenses={userInfo.expenses} />} */}
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
