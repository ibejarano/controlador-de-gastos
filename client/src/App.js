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
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function fetchData() {
      console.log("entro aca");
      try {
        const { data } = await axios.get("http://localhost:5000/user", {
          withCredentials: true,
        });
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, [isAuth]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainContainer>
          {user && (
            <React.Fragment>
              <Switch>
                <Route path="/logout">
                  <Logout />
                </Route>
                <Route path="/">
                  <Home userInfo={user} setUserInfo={setUser} />
                </Route>
              </Switch>
              <Navbar />
            </React.Fragment>
          )}
          {!user && <LoginPage setIsAuth={setIsAuth} />}
        </MainContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
