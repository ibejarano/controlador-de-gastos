import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../context/UserContext";
import Balance from "./Balance";
import Expenses from "./Expenses";
import AddExpenseForm from "./AddExpense";
import Button from "./common/Button";
import Modal from "./common/Modal";
import TitleAndSubtitle from "./TitleAndSubtitle";

import { getWalletDetails } from "../helpers/requests";

const StyledWalletDetails = styled.div`
  background: ${(props) => props.theme.color.walletColor};
  border-radius: 1.5em 1.5em 0em 0em;
  padding: 1em 2em;
  height: 100vh;
  position: fixed;
  top: ${(props) => (props.walletId ? `10vh` : `100vh`)};
  left: 0;
  transition: all 0.5s ease;
  width: 100%;

  a.close {
    position: absolute;
    right: 1em;
    top: 1em;
    background: none;
    color: ${(props) => props.theme.color.yellowText};
    border: none;
    font-weight: bold;
    font-size: 1.5em;
    transition: transform 0.2s ease-in-out;
  }

  @media (min-width: 600px) {
    padding-left: 6em;
    padding-right: 6em;
  }
`;

export default function WalletDetails({ walletId }) {
  const [wallet, setWallet] = useState(null);
  const [modal, toggleModal] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const { dispatch } = useUser();

  useEffect(() => {
    async function fetchWalletDetails() {
      const { data } = await getWalletDetails(walletId);
      setWallet(data);
    }
    if (walletId) {
      fetchWalletDetails();
    }
  }, [walletId]);

  return (
    <React.Fragment>
      <StyledWalletDetails walletId={walletId}>
        <React.Fragment>
          {wallet && (
            <React.Fragment>
              <Balance
                wallet={wallet}
                setWallet={setWallet}
                toggleModal={toggleModal}
                setIsIncome={setIsIncome}
              />
              <TitleAndSubtitle title="Historial" />

              <Expenses expenses={wallet.expenses} />
            </React.Fragment>
          )}
        </React.Fragment>
        <Button
          onClick={() => dispatch({ type: "close-wallet" })}
          style={{
            position: "absolute",
            top: "10px",
            left: "92%",
          }}
        >
          <FontAwesomeIcon icon={faWindowClose} size="lg" />
        </Button>
      </StyledWalletDetails>
      {modal && (
        <Modal>
          <AddExpenseForm
            walletId={walletId}
            setWallet={setWallet}
            toggleModal={toggleModal}
            isIncome={isIncome}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}
