import React, { useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./themes/main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainContainer from "./components/MainContainer";
// import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
// import BudgetPage from "./pages/Budget";
// import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";

import { getUserWithCookies } from "./helpers/requests";

import { UserProvider } from "./context/UserContext";

import "./App.css";

const sessionUser = JSON.parse(sessionStorage.getItem("expenses-user"));

function App() {
  // useEffect(() => {
  //   async function fetchData() {
  //     const { data, err } = await getUserWithCookies();
  //     if (err) {
  //       console.log(err.message);
  //     } else {
  //       dispatchUser({ type: "set-user", payload: data.user });
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <UserProvider>
            {/* {user.loggedIn ? ( */}
              <React.Fragment>
                <Switch>
                  {/* <Route path="/logout">
                    <Logout />
                  </Route>
                  <Route path="/budgets">
                    <BudgetPage />
                  </Route> */}
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
                <Navbar />
              </React.Fragment>
            {/* // ) : (
            //   <LoginPage />
            // )} */}
          </UserProvider>
        </MainContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
