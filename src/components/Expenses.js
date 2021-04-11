import React from "react";

import ExpensesTable from "./ExpensesTable";

export default function Expenses({ expenses }) {
  return <ExpensesTable expenses={expenses} />;
}
