import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import TitleAndSubtitle from "./TitleAndSubtitle";

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

const StyledWalletContainer = styled.div`
  background: ${(props) => props.theme.color.yellowText};
  /* height: 100px; */
  border-radius: 10px;
  padding: 1em;
  position: relative;
  min-width: 280px;
  margin-bottom: 2em;

  .wallet-title {
    padding: 0;
    margin: 0;
    margin-bottom: 1em;
  }

  a.details {
    background: ${(props) => props.theme.color.purpleText};
    color: ${(props) => props.theme.color.yellowText};
    font-weight: bold;
    font-size: 0.8em;
    position: absolute;
    right: 1em;
    bottom: 1em;
    padding: 0.25em 0.4em;
    text-decoration: none;
  }

  button.dropdown-options {
    border: none;
    background: inherit;
    color: ${(props) => props.theme.color.purpleText};
    font-weight: bold;
    font-size: 1.1em;
    position: absolute;
    right: 1em;
    top: 1em;
    padding: 0.25em 0.4em;
    cursor: pointer;
  }

  button.option {
    background: ${(props) => props.theme.color.purpleText};
    color: ${(props) => props.theme.color.yellowText};
    font-weight: bold;
    font-size: 0.8em;
    position: absolute;
    right: 3em;
    top: 2em;
    padding: 0.25em 0.4em;
    border: none;
  }
`;

const WalletContainer = ({ singleWallet, userInfo, setUserInfo }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const openMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    document.addEventListener("click", closeMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);

    document.removeEventListener("click", closeMenu);
  };

  return (
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
      <Link className="details" to={`/details?walletId=${singleWallet._id}`}>
        Ver Detalles
      </Link>
      <button type="button" className="dropdown-options" onClick={openMenu}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
      {showMenu && (
        <button
          className="option"
          onClick={() => {
            axios
              .delete(`http://localhost:5000/wallet/${singleWallet._id}`)
              .then((res) => {
                console.log(res);
                const filteredUserInfo = { ...userInfo };
                const updatedWallet = filteredUserInfo.wallet.filter(
                  (wallet) => wallet._id !== singleWallet._id
                );
                filteredUserInfo.wallet = updatedWallet;
                setUserInfo(filteredUserInfo);
              })
              .catch(console.log);
          }}
        >
          Borrar Billetera
        </button>
      )}
    </StyledWalletContainer>
  );
};

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

const WalletsContainer = ({ userInfo, setUserInfo }) => {
  return (
    <StyledWallets>
      {userInfo.wallets.map((singleWallet) => (
        <WalletContainer
          key={singleWallet._id}
          singleWallet={singleWallet}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      ))}
      <Link to="/add-wallet">
        <StyledPlusLink>
          <h1>+</h1>
        </StyledPlusLink>
      </Link>
    </StyledWallets>
  );
};

export default WalletsContainer;
