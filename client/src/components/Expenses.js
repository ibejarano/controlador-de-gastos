import React from "react";
import ExpensesTable from "./ExpensesTable";
import styled from "styled-components";

const ExpensesStyled = styled.div`
  background: ${props => props.theme.color.card};
  border-radius: 20px;
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  padding-bottom: 20px;
  h3 {
    display: block;
    font-size: 16px;
  }
`;

export default function Expenses({ expenses }) {
  return (
    <ExpensesStyled>
      <h3>Registro de Ingresos y Gastos</h3>
      <ExpensesTable expenses={expenses} />
    </ExpensesStyled>
  );
}
