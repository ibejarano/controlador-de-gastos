import React from 'react'
import styled from "styled-components";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import TitleContainer from "../components/common/Title"
import AddWallet from "../components/AddWallet"
import DeleteWallet from "../components/DeleteWallet"
import ChangeWalletName from '../components/ChangeWalletName'
import ChangeBudgetLimit from '../components/ChangeBudgetLimit'

const ConfigTextContainer = styled.div`
  color: ${(props) => props.theme.color.card};
  padding: 2em 1em;
  border-radius: 20px;
  max-width: 450px;
  h1 {
    margin: 0;
    font-size: 1.1em;
  }
  ul {
    list-style-type: none;
    padding: 0 0 0 1em;
  }
  li {
    margin: 1em 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    color: yellow;
  }
`;

function ConfigOptions() {
  return (
    <ConfigTextContainer>

      <h1>Billeteras</h1>

      <ul>
        <li><Link to="/config/add_wallet">Agregar billetera</Link></li>
        <li><Link to="/config/change_wallet_name">Cambiar nombre de billetera</Link></li>
        <li><Link to="/config/delete_wallet">Eliminar billetera</Link></li>
      </ul>
      <h1>Presupuestos</h1>
      <ul>
        <li><Link to="/config/change_budget_limit">Cambiar limite de presupuesto</Link></li>
      </ul>
    </ConfigTextContainer>
  )
}


export default function ConfigPage() {

  return (
    <React.Fragment>
      <TitleContainer title="Configuracion" />
      <Switch>
        <Route exact path="/config/add_wallet"><AddWallet /></Route>
        <Route exact path="/config/change_wallet_name"><ChangeWalletName /></Route>
        <Route exact path="/config/delete_wallet"><DeleteWallet /></Route>
        <Route exact path="/config/change_budget_limit"><ChangeBudgetLimit /></Route>
        <Route path="/config" ><ConfigOptions /></Route>
      </Switch>
    </React.Fragment>
  )
}
