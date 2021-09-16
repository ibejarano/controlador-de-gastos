import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./themes/main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import MainContainer from "./components/MainContainer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import ConfigPage from "./pages/ConfigPage";
import BudgetPage from "./pages/Budget";
import Logout from "./pages/Logout";
import Info from "./pages/Info";
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
              <Route exact path="/register">
                <RegisterPage />
              </Route>
              <Route exact path="/">
                <LoginPage />
              </Route>
              <PrivateRoutes />
            </Switch>
          </UserProvider>
          <ToastContainer />
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
      <Route exact path="/config">
        <ConfigPage />
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
      <Route exact path="/info">
        <Info />
      </Route>
      <Navbar />
    </React.Fragment>
  );
}

export default App;
