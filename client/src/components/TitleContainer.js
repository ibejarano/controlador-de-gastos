import React from "react";
import styled from "styled-components";

const TitleStyleCard = styled.div`
  background: ${(props) => props.theme.color.card};
  padding: 12px;
  border-radius: 20px;
  max-width: 450px;
  h3 {
    margin: 0;
    font-size: 14px;
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
