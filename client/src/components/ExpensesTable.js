import React from "react";

// import { Container } from './styles';

const ExpensesTable = ({ expenses }) => (
  <table>
    <thead>
      <tr>
        <th>Descripcion</th>
        <th>$</th>
        <th>Seccion</th>
        <th>Billetera</th>
        <th>Fecha</th>
      </tr>
      {expenses.map((exp) => (
        <tr key={exp._id}>
          <td>{exp.description}</td>
          <td>{exp.amount}</td>
          <td>{exp.section}</td>
          <td>{exp.fromWallet}</td>
          <td>{exp.atDate}</td>
        </tr>
      ))}
    </thead>
  </table>
);

export default ExpensesTable;
