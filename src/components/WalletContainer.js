import React from "react";
import styled from "styled-components";
import axios from "axios";

import TitleAndSubtitle from "./common/TitleAndSubtitle";
import Button from "./common/Button";

import DotsButton from "./common/DotsButton";

const StyledWalletContainer = styled.div`
  background: ${(props) => props.theme.color.yellowText};
  border-radius: 10px;
  padding: 0.5em;
  position: relative;
  margin-bottom: 2em;
  width: 100%;

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

export default function WalletContainer({ wallet, dispatch, setWallets }) {
  const openWallet = async (walletId) => {
    dispatch({
      type: "open-wallet",
      payload: { name: wallet.name, id: walletId },
    });
  };

  const deleteWallet = async () => {
    const { data } = await axios.delete(
      `http://localhost:5000/wallet/${wallet._id}`,
      {
        withCredentials: true,
      }
    );
    setWallets(data);
    // dispatch({ type: "update-wallet" });
  };

  const { _id, name, description, balance } = wallet;

  return (
    <StyledWalletContainer onClick={() => openWallet(_id)}>
      <TitleAndSubtitle
        title={`${name}`}
        subtitle={`${description}`}
        invert={true}
      />
      <div className="wallet-balance">
        <TitleAndSubtitle
          title={`Balance: $${balance}`}
          // subtitle={`${wallet.description}`}
          invert={true}
        />
      </div>
    </StyledWalletContainer>
  );
}
