import React from "react";
import styled from "styled-components";

const BalanceCardContainer = styled.div`
  background: ${props => props.theme.color.card};
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  height: 150px;

  h3 {
    font-size: 18px;
    margin-bottom: 0;
  }

  .container-balance {
    margin: 0;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
  }
`;

const BalanceItem = styled.div`
  font-size: 14px;
  color: white;
  width: 90px;
  height: 70px;
  border-radius: 10px;
  background: ${props =>
    props.primary
      ? props.theme.color.greenCard
      : props.warning
      ? props.theme.color.warningCard
      : props.theme.color.neutralCard};
  h3 {
    font-size: 14px;
    width: 100%;
    text-align: center;
    margin: 10px 0;
  }
`;

export default function MonthBalance({ wallet, expenses }) {
  const totalWallet = wallet.reduce((acc, wal) => (acc += wal.balance), 0);
  const totalExpenses = expenses.reduce((acc, exp) => (acc += exp.amount), 0);
  return (
    <BalanceCardContainer>
      <h3>Balance de saldos</h3>
      <div className="container-balance">
        <BalanceItem className="balance-item" primary>
          <h3>Ingresos</h3>
          <h3>{totalWallet}</h3>
        </BalanceItem>
        <BalanceItem className="balance-item" warning>
          <h3> Gastos </h3>
          <h3>{totalExpenses}</h3>
        </BalanceItem>
        <BalanceItem className="balance-item" neutral>
          <h3> Total </h3>
          <h3>{totalWallet - totalExpenses}</h3>
        </BalanceItem>
      </div>
    </BalanceCardContainer>
  );
}
