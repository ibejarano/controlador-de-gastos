import React from "react";
import styled from "styled-components";

const MainContainerStyle = styled.div`
  background: ${(props) => props.theme.color.mainBackground};
  padding: 1em 1em;
  min-height: 100vh;
`;

const MainContainer = ({ children }) => (
  <MainContainerStyle className="main-container">{children}</MainContainerStyle>
);

export default MainContainer;
