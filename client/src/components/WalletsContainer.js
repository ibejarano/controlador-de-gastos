import React from "react";
import styled from "styled-components";

import TitleAndSubtitle from "./TitleAndSubtitle";

const StyledWalletContainer = styled.div`
  background: ${(props) => props.theme.color.yellowText};
  /* height: 100px; */
  border-radius: 10px;
  padding: 1em;
  position: relative;
  /* min-width: 300px; */

  .wallet-title {
    padding: 0;
    margin: 0;
    margin-bottom: 1em;
  }

  a {
    background: ${(props) => props.theme.color.purpleText};
    color: ${(props) => props.theme.color.yellowText};
    font-weight: bold;
    font-size: 0.8em;
    position: absolute;
    right: 1em;
    bottom: 1em;
    padding: 0.25em .4em;
    text-decoration: none;
  }
`;

const WalletContainer = ({ singleWallet }) => (
  <StyledWalletContainer>
    <div className="wallet-title">
      <TitleAndSubtitle
        title="Nombre de cuenta"
        subtitle="Aca describo un toque"
        invert={true}
      />
    </div>
    <div className="wallet-balance">
      <TitleAndSubtitle
        title="Balance: $12000"
        subtitle="Moneda: USD"
        invert={true}
      />
    </div>
    <a href="#">Ver Detalles</a>
  </StyledWalletContainer>
);

const WalletsContainer = ({ wallet }) => {
  console.log(wallet);
  return (
    <React.Fragment>
      {wallet.map((singleWallet) => (
        <WalletContainer singleWallet={singleWallet} />
      ))}
    </React.Fragment>
  );
};

export default WalletsContainer;
