import React from "react";
import styled from "styled-components";

const TitleStyleCard = styled.div`
  background: ${(props) => props.theme.color.card};
  padding: 0.8em 1em;
  border-radius: 20px;
  
  h3 {
    margin: 0;
    font-size: 1.1em;
  }
`;

const TitleContainer = ({ username, title }) => (
  <TitleStyleCard>
    {username && <h3>Bienvenid@, {username}!</h3>}
    {title && <h3>{title}</h3>}
    {!username && !title && <h3>Cargando...</h3>}
  </TitleStyleCard>
);

export default TitleContainer;
