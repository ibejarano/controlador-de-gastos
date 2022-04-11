import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import ConfigPage from "./pages/ConfigPage";
import BudgetPage from "./pages/Budget";
import Info from "./pages/Info";

import { UserProvider, useUser } from "./context/UserContext";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

function PrivateRoutes() {
  const {
    user: { loggedIn },
  } = useUser();

  if (!loggedIn) return <Redirect to="/" />;
  return (
    <Layout>
      <Route exact path="/wallets">
        <Home />
      </Route>
      <Route exact path="/budgets">
        <BudgetPage />
      </Route>
      <Route path="/config">
        <ConfigPage />
      </Route>
      <Route exact path="/info">
        <Info />
      </Route>
    </Layout>
  );
}

export default App;
