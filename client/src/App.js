import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import theme from "./themes/main";
import TitleContainer from './components/TitleContainer'

const USERID_TEST = '5e89de48d8784a4727158acc'

function App() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${USERID_TEST}`)
      .then(({data}) => setUserInfo(data))
      .catch(console.log);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">Hello!</header>
      <TitleContainer username={userInfo.username} />
    </ThemeProvider>
  );
}

export default App;
