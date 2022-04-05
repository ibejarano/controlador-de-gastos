import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import AddWallet from "../components/AddWallet";
import DeleteWallet from "../components/DeleteWallet";
import ChangeWalletName from "../components/ChangeWalletName";

function ConfigOptions() {
  return (
    <div>
      <h1>Billeteras</h1>

      <ul>
        <li>
          <Link to="/config/add_wallet">Agregar billetera</Link>
        </li>
        <li>
          <Link to="/config/change_wallet_name">
            Cambiar nombre de billetera
          </Link>
        </li>
        <li>
          <Link to="/config/delete_wallet">Eliminar billetera</Link>
        </li>
      </ul>
      <h1>Presupuestos</h1>
      <ul>
        <li>
          <Link to="/config/change_budget_limit">
            Cambiar limite de presupuesto
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function ConfigPage() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/config/add_wallet">
          <AddWallet />
        </Route>
        <Route exact path="/config/change_wallet_name">
          <ChangeWalletName />
        </Route>
        <Route exact path="/config/delete_wallet">
          <DeleteWallet />
        </Route>
        <Route path="/config">
          <ConfigOptions />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
