import React from "react";
import styled from "styled-components";

import { logout } from "../helpers/requests";

const StyledLogoutContainer = styled.div`
  background: ${(props) => props.theme.color.yellowText};
  margin: 4em auto;
  border-radius: 20px;
  max-width: 600px;

  h1 {
    font-size: 20px;
    text-align: center;
  }
  button {
    margin: 0 auto;
  }
`;

const Logout = ({ setIsAuth }) => {
  const logoutConfirm = async () => {
    await logout();
    setIsAuth(false);
    sessionStorage.removeItem("expenses-user");
    window.location = "/";
  };

  return (
    <StyledLogoutContainer>
      <h1>Estas seguro que quieres salir?</h1>
      <button type="button" onClick={logoutConfirm}>
        Confirmar
      </button>
    </StyledLogoutContainer>
  );
};

export default Logout;
