import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./themes/main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import MainContainer from "./components/MainContainer";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import BudgetPage from "./pages/Budget";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";
import AddWallet from "./components/AddWallet";

import { UserProvider, useUser } from "./context/UserContext";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <UserProvider>
            <Switch>
              <Route exact path="/">
                <LoginPage />
              </Route>
              <PrivateRoutes />
            </Switch>
          </UserProvider>
        </MainContainer>
      </ThemeProvider>
    </Router>
  );
}

function PrivateRoutes() {
  const {
    user: { loggedIn },
  } = useUser();
  if (!loggedIn) return <Redirect to="/" />;
  return (
    <React.Fragment>
      <Route path="/add-wallet">
        <AddWallet />
      </Route>
      <Route exact path="/wallets">
        <Home />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route exact path="/budgets">
        <BudgetPage />
      </Route>
      <Navbar />
    </React.Fragment>
  );
}

export default App;
