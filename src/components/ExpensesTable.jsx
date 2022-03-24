import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const ExpensesTable = ({ expenses }) => (
  <Table>
    <Thead>
      <Tr>
        <Th>Descripcion</Th>
        <Th>Monto $</Th>
        <Th>Seccion</Th>
        <Th>Fecha</Th>
      </Tr>
    </Thead>
    <Tbody>
      {expenses.map((exp) => (
        <Tr key={exp._id}>
          <Td align="center">{exp.description}</Td>
          <Td align="center">{exp.amount}</Td>
          <Td align="center">{exp.section}</Td>
          <Td align="center">{new Date(exp.createdAt).toLocaleDateString()}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default ExpensesTable;
