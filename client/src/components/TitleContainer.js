import React from "react";
import styled from "styled-components";

const TitleStyleCard = styled.div`
  background: ${props => props.theme.color.card};
  padding: 12px;
  border-radius: 20px;
  h3 {
    margin: 0;
    font-size: 14px;
  }
`;

const TitleContainer = ({ username }) => (
  <TitleStyleCard>
    <h3>Bienvenid@, {username}!</h3>
  </TitleStyleCard>
);

export default TitleContainer;
