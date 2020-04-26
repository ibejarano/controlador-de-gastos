import React from "react";
import styled from "styled-components";

const MainContainerStyle = styled.div`
  background: ${(props) => props.theme.color.mainBackground};
  padding-top: 0.1em;
  min-height: 100vh;
  > div {
    margin: 24px;
    margin-top: 0.75em;
  }

  @media (min-width: 600px) {
    > div {
      margin: 0 auto;
    }
  }
`;

const MainContainer = ({ children }) => (
  <MainContainerStyle className="main-container">{children}</MainContainerStyle>
);

export default MainContainer;