import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import theme from "./themes/main";

import MainContainer from "./components/MainContainer";
import Home from "./pages/Home";

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
        <Home userInfo={userInfo} />
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
