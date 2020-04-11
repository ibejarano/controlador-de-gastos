import React from "react";
import styled from "styled-components";

import ExpensesTable from "./ExpensesTable";
import TitleAndSubtitle from "./TitleAndSubtitle";

const ExpensesStyled = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  padding-bottom: 20px;
  padding: 0;
`;

export default function Expenses({ expenses }) {
  return (
    <ExpensesStyled>
      <TitleAndSubtitle title="Registro de ingresos y gastos" />
      <ExpensesTable expenses={expenses} />
    </ExpensesStyled>
  );
}
