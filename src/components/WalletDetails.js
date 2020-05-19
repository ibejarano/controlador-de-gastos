import React, { useQuery, useState } from "react";
import styled from "styled-components";
import Error from "./Error";
import { useUser } from "../context/UserContext";
import TitleContainer from "./common/Title";

const StyledWalletDetails = styled.div`
  background: ${(props) => props.theme.color.walletColor};
  border-radius: 3em;
  padding: 24px;
  margin-left: 0 !important ;
  margin-right: 0 !important ;
  height: 100vh;
  position: absolute;
  top: 10vh;
  width: 300px;

  button.add {
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
    border: none;
    padding: 0.3em;
    margin-bottom: 1em;
    font-weight: bold;
    font-size: 1em;
    transition: transform 0.2s ease-in-out;
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
  button:hover {
    transform: scale(1.2);
  }

  @media (min-width: 600px) {
    padding-left: 6em;
    padding-right: 6em;
  }
`;

export default function WalletDetails() {
  const addExpense = false;
  const [error, setError] = useState(null);
  const {
    user: { wallet },
    dispatch,
  } = useUser();
  return (
    <React.Fragment>
      <TitleContainer title={`Billetera: ${wallet.name}`} />
      <StyledWalletDetails>
        {/* {wallet.expenses && !addExpense && <BalanceCard wallet={wallet} />} */}
        {/* {wallet.expenses && !addExpense && (
          <React.Fragment>
            <button className="add" onClick={() => setAddExpense(true)}>
              Agregar nuevo registro
            </button>
            <Expenses expenses={wallet.expenses} />
          </React.Fragment>
        )} */}
        {/* {addExpense && (
            <AddExpense
              walletId={wallet._id}
              closeAddExpenseDialog={setAddExpense}
              setError={setError}
              sectionsSaved={sectionsSaved}
            />
          )} */}
        <button
          type="button"
          className="close"
          onClick={() => dispatch({ type: "close-wallet" })}
        >
          X
        </button>
      </StyledWalletDetails>
      {error && <Error error={error} />}
    </React.Fragment>
  );
}
