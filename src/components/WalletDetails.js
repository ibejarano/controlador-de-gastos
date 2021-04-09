import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Error from "./Error";
import { useUser } from "../context/UserContext";
import Balance from "./Balance";
import Expenses from "./Expenses";
import AddExpenseForm from "./AddExpense";

import { getWalletDetails } from "../helpers/requests";

const StyledWalletDetails = styled.div`
  background: ${(props) => props.theme.color.walletColor};
  border-radius: 1.5em 1.5em 0em 0em;
  padding: 12px;
  height: 100vh;
  position: fixed;
  top: ${(props) => (props.walletId ? `10vh` : `100vh`)};
  margin: 0 auto;
  transition: all 0.5s ease;

  button.add {
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
    border: none;
    padding: 0.3em;
    margin-bottom: 1em;
    font-weight: bold;
    font-size: 1em;
  }

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
  console.log("mostrando...", walletId);
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [error, setError] = useState(null);
  const [wallet, setWallet] = useState(null);
  const { dispatch } = useUser();

  useEffect(() => {
    async function fetchWalletDetails() {
      const { data } = await getWalletDetails(walletId);
      setWallet(data);
    }

    fetchWalletDetails();
  }, [walletId]);

  return (
    <React.Fragment>
      <StyledWalletDetails walletId={walletId}>
        {wallet && (
          <React.Fragment>
            <Balance wallet={wallet} />
            <button className="add" onClick={() => setOpenAddExpense(true)}>
              Agregar nuevo registro
            </button>
            <Expenses expenses={wallet.expenses} />
          </React.Fragment>
        )}

        <button
          type="button"
          className="close"
          onClick={() => dispatch({ type: "close-wallet" })}
        >
          X
        </button>
        {openAddExpense && (
          <AddExpenseForm
            walletId={wallet._id}
            setOpenAddExpense={setOpenAddExpense}
            setError={setError}
            setWallet={setWallet}
          />
        )}
      </StyledWalletDetails>
      {error && <Error error={error} />}
    </React.Fragment>
  );
}
