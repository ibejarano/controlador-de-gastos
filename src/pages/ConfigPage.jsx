import React from 'react'
import styled from "styled-components";

import TitleContainer from "../components/TitleContainer"


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

export default function ConfigPage() {

  return (
    <React.Fragment>
      <TitleContainer title="Configuracion" />
      <ConfigTextContainer>

        <h1>Billeteras</h1>
        <ul>
          <li>Agregar Billetera</li>
          <li>Editar nombre de billetera</li>
          <li>Eliminar billetera</li>
        </ul>
        <h1>Presupuestos</h1>
        <ul>
          <li>Crear Seccion</li>
          <li>Editar nombre de seccion</li>
          <li>Modificar limite de presupuesto</li>
        </ul>
      </ConfigTextContainer>
    </React.Fragment>
  )
}
