import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  background: ${props => props.theme.color.tableBackground};
  width: 300px;
  border-collapse: collapse;
  border-radius: 10px;

  th {
    font-size: 9px;
    padding-top: 12px;
  }
  td {
    font-size: 8px;
    align: center;
    height: 100%;
    border-right: 1px solid black;
  }
  td:last-child {
    border-right: none;
  }
  th:last-child {
    border-right: none;
  }
`;

const ExpensesTable = ({ expenses }) => (
  <StyledTable>
    <thead>
      <tr>
        <th>Descripcion</th>
        <th>$</th>
        <th>Seccion</th>
        {/* <th>Billetera</th> */}
        <th>Fecha</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map(exp => (
        <tr key={exp._id}>
          <td align="center">{exp.description}</td>
          <td align="center">{exp.amount}</td>
          <td align="center">{exp.section}</td>
          {/* <td align="center">{exp.fromWallet.splice}</td> */}
          <td align="center">{new Date(exp.atDate).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  </StyledTable>
);

export default ExpensesTable;
