import React from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

import WalletContainer from "../components/WalletContainer";
import styled from "styled-components";
import TitleContainer from "../components/common/Title";
import TitleAndSubtitle from "../components/common/TitleAndSubtitle";
import WalletDetails from "../components/WalletDetails";

const StyledWallets = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;

  @media (min-width: 600px) {
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0 4em;
  }
`;

const StyledPlusLink = styled.div`
  font-size: 2em;
  border-radius: 50%;
  background: ${(props) => props.theme.color.yellowText};
  width: 100px;
  height: 100px;
  cursor: pointer;
  margin-bottom: 1em;
  text-decoration: none;
  h1 {
    margin: auto;
    text-align: center;
  }
`;

export default function HomePage() {
  const { user, dispatch } = useUser();

  return (
    <React.Fragment>
      <TitleContainer title={user.title} />
      <TitleAndSubtitle
        title="Cuentas"
        subtitle="Seleccione una para ver el estado"
      />
      {user.wallets.length && (
        <StyledWallets>
          {user.wallets.map((wallet) => (
            <WalletContainer
              key={wallet._id}
              wallet={wallet}
              dispatch={dispatch}
            />
          ))}
          <Link to="/add-wallet">
            <StyledPlusLink>
              <h1>+</h1>
            </StyledPlusLink>
          </Link>
        </StyledWallets>
      )}
      {user.openWallet && <WalletDetails />}
    </React.Fragment>
  );
}
