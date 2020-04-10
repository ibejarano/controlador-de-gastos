import React from "react";
import styled from "styled-components";

const MainContainerStyle = styled.div`
  background: ${props => props.theme.color.mainBackground};
  height: 100vh;
  padding-top: 24px;
  > div {
    margin: 24px;
  }
`;

const MainContainer = ({ children }) => (
  <MainContainerStyle className="main-container">{children}</MainContainerStyle>
);

export default MainContainer;
