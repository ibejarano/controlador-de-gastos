import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./themes/main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import MainContainer from "./components/MainContainer";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:5000/user", {
          withCredentials: true,
        });
        if (!user) {
          setUser({});
        } else {
          setUser(data.user);
          setLoggedIn(true);
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {loggedIn && (
          <MainContainer>
            <Switch>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/">
                <Home userInfo={user} setUserInfo={setUser} />
              </Route>
            </Switch>
            <Navbar />
          </MainContainer>
        )}
        {!loggedIn && <LoginPage setLoggedIn={setLoggedIn} setUser={setUser} />}
      </ThemeProvider>
    </Router>
  );
}

export default App;
