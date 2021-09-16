import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const BalanceCardContainer = styled.div`
  border-radius: 20px;
  display: flex;
  flex-flow: row wrap;

  .container-balance {
    margin: 0;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
`;

const BalanceItem = styled.div`
  font-size: 14px;
  color: white;
  width: 45%;
  border-radius: 10px;
  margin-bottom: 1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: center;
  background: ${(props) =>
    props.primary
      ? props.theme.color.greenCard
      : props.warning
      ? props.theme.color.warningCard
      : props.theme.color.neutralCard};
  h3 {
    font-size: 12px;
    width: 100%;
    text-align: center;
    margin: 10px 0;
  }
`;

export default function MonthBalance({ wallet, toggleModal, setIsIncome }) {
  const { expenses, balance } = wallet;
  const totalExpenses = expenses
    .filter((exp) => exp.amount < 0)
    .reduce((acc, exp) => (acc += exp.amount), 0);

  const totalIncomes = expenses
    .filter((exp) => exp.amount > 0)
    .reduce((acc, exp) => (acc += exp.amount), 0);

  return (
    <BalanceCardContainer>
      <BalanceItem neutral style={{ width: "100%" }}>
        <h3> Balance </h3>
        <h3>{balance}</h3>
      </BalanceItem>
      <div className="container-balance">
        <BalanceItem primary>
          <div style={{ width: "80%" }}>
            <h3>Ingresos</h3>
            <h3>{totalIncomes}</h3>
          </div>
          <FontAwesomeIcon
            icon={faPlusSquare}
            size="2x"
            onClick={() => {
              setIsIncome(true);
              toggleModal(true);
            }}
          />
        </BalanceItem>
        <BalanceItem warning>
          <div style={{ width: "80%" }}>
            <h3> Gastos </h3>
            <h3>{totalExpenses}</h3>
          </div>
          <FontAwesomeIcon
            icon={faPlusSquare}
            size="2x"
            onClick={() => {
              setIsIncome(false);
              toggleModal(true);
            }}
          />
        </BalanceItem>
      </div>
    </BalanceCardContainer>
  );
}
