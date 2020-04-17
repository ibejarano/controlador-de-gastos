import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import theme from "./themes/main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainContainer from "./components/MainContainer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

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
    <Router>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <Switch>
            <Route path="/">
              <Home userInfo={userInfo} setUserInfo={setUserInfo} />
            </Route>
          </Switch>
          <Navbar />
        </MainContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
