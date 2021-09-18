import React from 'react'
import styled from "styled-components";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import TitleContainer from "../components/TitleContainer"
import AddWallet from "../components/AddWallet"
import DeleteWallet from "../components/DeleteWallet"

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
`;

function ConfigOptions() {
  return (
    <ConfigTextContainer>

      <h1>Billeteras</h1>

      <ul>
        <li><Link to="/config/add_wallet">Agregar Billetera</Link></li>
        <li>Editar nombre de billetera - TODO</li>
        <li><Link to="/config/delete_wallet">Eliminar Billetera</Link></li>
      </ul>
      <h1>Presupuestos</h1>
      <ul>
        <li>Crear Seccion</li>
        <li>Editar nombre de seccion</li>
        <li>Modificar limite de presupuesto</li>
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
        <Route exact path="/config/delete_wallet"><DeleteWallet /></Route>
        <Route path="/config" ><ConfigOptions /></Route>
      </Switch>
    </React.Fragment>
  )
}
