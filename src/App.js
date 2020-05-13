import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./themes/main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainContainer from "./components/MainContainer";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import BudgetPage from "./pages/Budget";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";

import { getUserWithCookies } from "./helpers/requests";

import "./App.css";

function App() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("expenses-user"))
  );
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data, err } = await getUserWithCookies();
      if (err) {
        console.log(err.message);
      } else {
        setUser(data.user);
        sessionStorage.setItem("expenses-user", JSON.stringify(data.user));
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
                  <Logout setIsAuth={setIsAuth} />
                </Route>
                <Route path="/budgets">
                  <BudgetPage data={[]} />
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
