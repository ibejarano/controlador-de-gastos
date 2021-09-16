import React, { useState, useEffect } from "react";
import TitleContainer from "../components/TitleContainer";

import DisplayBudgets from "../components/DisplayBudget";

import { getBudgets } from "../helpers/requests";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBudgets() {
      const { data } = await getBudgets();
      setBudgets(data);
    }
    if (isLoading) {
      fetchBudgets();
      setLoading(false);
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      <TitleContainer title="Presupuestos" />
      <DisplayBudgets budgets={budgets} setLoading={setLoading} />
    </React.Fragment>
  );
}
