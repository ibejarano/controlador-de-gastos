import React, { useState, useEffect, useContext } from "react";
import { Route, Link, useLocation, Switch } from "react-router-dom";
import styled from "styled-components";
import { Circle } from "react-spinners-css";

import WalletsContainer from "../components/WalletsContainer";
import TitleContainer from "../components/TitleContainer";

import Add from "../components/AddExpense";
import BalanceCard from "../components/MonthBalance";
import Expenses from "../components/Expenses";
import Error from "../components/Error";
import AddWallet from "../components/AddWallet";

import UserContext from "../context/UserContext";

import { getWalletDetails } from "../helpers/requests";

const StyledWalletDetails = styled.div`
  background: ${(props) => props.theme.color.walletColor};
  border-radius: 3em;
  padding: 24px;
  margin-left: 0 !important ;
  margin-right: 0 !important ;
  height: 100vh;
  position: relative;

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ShowWalletDetails = ({ sectionsSaved }) => {
  const [addExpense, setAddExpense] = useState(false);
  const [wallet, setWallet] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = useQuery();
  const walletId = query.get("walletId");

  useEffect(() => {
    async function fetchData() {
      const { data, err } = await getWalletDetails(walletId);
      if (err) {
        setError(err.response.data.error);
      } else {
        setWallet(data);
      }
      setLoading(false);
    }

    if (walletId) {
      fetchData();
    }
  }, [walletId]);

  return (
    <React.Fragment>
      <TitleContainer
        title={
          loading
            ? "Cargando..."
            : addExpense
            ? "Agregar nuevo registro"
            : `Billetera: ${wallet.name}`
        }
      />
      {loading && <Circle />}
      {!loading && (
        <StyledWalletDetails>
          {wallet.expenses && !addExpense && <BalanceCard wallet={wallet} />}
          {wallet.expenses && !addExpense && (
            <React.Fragment>
              <button className="add" onClick={() => setAddExpense(true)}>
                Agregar nuevo registro
              </button>
              <Expenses expenses={wallet.expenses} />
            </React.Fragment>
          )}
          {addExpense && (
            <Add
              wallet={wallet}
              setWallet={setWallet}
              closeAddExpenseDialog={setAddExpense}
              setError={setError}
              sectionsSaved={sectionsSaved}
            />
          )}
          <Link className="close" to="/">
            X
          </Link>
        </StyledWalletDetails>
      )}
      {error && <Error error={error} />}
    </React.Fragment>
  );
};

export default function HomePage() {
  const { user } = useContext(UserContext);
  return (
    <Switch>
      <Route path="/add-wallet">
        <AddWallet />
      </Route>
      <Route path="/details">
        <ShowWalletDetails sectionsSaved={user.sectionsSaved} />
      </Route>
      <Route path="/">
        <WalletsContainer username={user.username} wallets={user.wallets} />
      </Route>
    </Switch>
  );
}
