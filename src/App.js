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

import { UserProvider, useUser } from "./context/UserContext";

import "./App.css";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <UserProvider>
            <Switch>
              <PrivateRoute path="/logout" component={Logout} />
              <PrivateRoute path="/budgets" component={BudgetPage} />
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute exact path="/" component={Home} />
            </Switch>
          </UserProvider>
        </MainContainer>
      </ThemeProvider>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const {
    user: { loggedIn },
  } = useUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <React.Fragment>
            <Component {...props} />
            <Navbar />
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default App;
