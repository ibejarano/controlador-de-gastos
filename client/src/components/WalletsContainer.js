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

  button {
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

const WalletContainer = ({ singleWallet, setWalletId }) => (
  <StyledWalletContainer>
    <div className="wallet-title">
      <TitleAndSubtitle
        title={singleWallet.name}
        subtitle="Implementacion pendiente Descripcion"
        invert={true}
      />
    </div>
    <div className="wallet-balance">
      <TitleAndSubtitle
        title={`Balance: $${singleWallet.balance}`}
        subtitle={`Moneda: ${singleWallet.currency.toUpperCase()}`}
        invert={true}
      />
    </div>
    <button onClick={() => setWalletId(singleWallet._id)}>Ver Detalles</button>
  </StyledWalletContainer>
);

const WalletsContainer = ({ wallet, setWalletId }) => {
  return (
    <React.Fragment>
      {wallet.map((singleWallet) => (
        <WalletContainer key={singleWallet._id} singleWallet={singleWallet} setWalletId={setWalletId} />
      ))}
    </React.Fragment>
  );
};

export default WalletsContainer;
