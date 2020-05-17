import React, { useState, useEffect } from "react";
import { Route, Link, useLocation, Switch } from "react-router-dom";
import styled from "styled-components";
import { Circle } from "react-spinners-css";

import WalletsContainer from "../components/WalletsContainer";
import TitleContainer from "../components/TitleContainer";
import TitleAndSubtitle from "../components/TitleAndSubtitle";

import Add from "../components/AddExpense";
import AddWallet from "../components/AddWallet";
import BalanceCard from "../components/MonthBalance";
import Expenses from "../components/Expenses";
import Error from "../components/Error";

import { getWalletDetails } from "../helpers/requests";

const ShowWallets = ({ userInfo, setUserInfo }) => (
  <React.Fragment>
    <TitleContainer username={userInfo.username} />
    <TitleAndSubtitle
      title="Cuentas"
      subtitle="Seleccione una para ver el estado"
    />
    {userInfo && (
      <WalletsContainer userInfo={userInfo} setUserInfo={setUserInfo} />
    )}
  </React.Fragment>
);

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

const Home = ({ userInfo, setUserInfo }) => {
  return (
    <Switch>
      <Route path="/add-wallet">
        <AddWallet setUserInfo={setUserInfo} />
      </Route>
      <Route path="/details">
        <ShowWalletDetails sectionsSaved={userInfo.sectionsSaved} />
      </Route>
      <Route path="/">
        <ShowWallets userInfo={userInfo} setUserInfo={setUserInfo} />
      </Route>
    </Switch>
  );
};

export default Home;
