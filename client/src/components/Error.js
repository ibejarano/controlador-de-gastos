import React from "react";
import styled from "styled-components";

const StyledError = styled.div`
  background: pink;
  color: red;
  position: fixed;
  top: 2em;
  left: 2em;
  font-size: 20px;
  width: 50%;
`;

const Error = ({ error }) => <StyledError>{error}</StyledError>;

export default Error;
