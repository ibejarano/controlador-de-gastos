import React from "react";
import styled from "styled-components";

import { logout } from "../helpers/requests";

import StyledButton from "../components/common/Button"

const StyledLogoutContainer = styled.div`
  background: ${(props) => props.theme.color.yellowText};
  margin: 4em auto;
  border-radius: 20px;
  max-width: 600px;
  padding: 1em;
  display: flex;
  flex-flow: column nowrap;

  h1 {
    font-size: 20px;
    text-align: center;
  }
`;

const Logout = () => {
  const logoutConfirm = async () => {
    await logout();
    sessionStorage.removeItem("expenses-user");
    window.location = "/";
  };

  return (
    <StyledLogoutContainer>
      <h1>Estas seguro que quieres salir?</h1>
      <StyledButton onClick={logoutConfirm}>
        Confirmar
      </StyledButton>
    </StyledLogoutContainer>
  );
};

export default Logout;
