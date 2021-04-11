import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  background: ${(props) => props.theme.color.tableBackground};
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;

  th {
    font-size: 12px;
    padding-top: 12px;
  }
  td {
    font-size: 12px;
    text-align: center;
    height: 100%;
    border-right: 1px solid black;
  }
  td:last-child {
    border-right: none;
  }
  th:last-child {
    border-right: none;
  }

  @media (min-width: 600px) {
    width: 100%;
    td {
      font-size: 16px;
    }
    th {
      font-size: 16px;
    }
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
      {expenses.map((exp) => (
        <tr key={exp._id}>
          <td align="center">{exp.description}</td>
          <td align="center">{exp.amount}</td>
          <td align="center">{exp.section}</td>
          <td align="center">{new Date(exp.createdAt).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  </StyledTable>
);

export default ExpensesTable;
