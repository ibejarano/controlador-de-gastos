import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import WalletsContainer from "../components/WalletsContainer";
import TitleContainer from "../components/TitleContainer";

// import AddExpense from "../components/AddExpense";
import BalanceCard from "../components/Balance";
import Expenses from "../components/Expenses";
import Error from "../components/Error";
// import AddWallet from "../components/AddWallet";

import { useUser } from "../context/UserContext";

export default function HomePage() {
  const { user, dispatch } = useUser();
  return (
    <Switch>
      {/* <Route path="/add-wallet">
        <AddWallet />
      </Route>
      <Route path="/details">
        <ShowWalletDetails sectionsSaved={user.sectionsSaved} />
      </Route> */}
      <Route path="/">
        <WalletsContainer
          {...user}
          dispatch={dispatch}
        />
      </Route>
    </Switch>
  );
}
