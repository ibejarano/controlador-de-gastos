import React, { useState, useEffect, useRef } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";

import { getBudgets } from "../helpers/requests";
import BudgetCard from "../components/BudgetCard";
import ChangeBudgetLimit from "../components/ChangeBudgetLimit";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

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
      {budgets.map((budget) => (
        <BudgetCard key={budget.section} {...budget} />
      ))}
      <Button
        pos="fixed"
        bottom="10vh"
        right="5%"
        leftIcon={<EditIcon />}
        colorScheme="teal"
        variant="solid"
        ref={btnRef}
        onClick={onOpen}
      >
        Modificar presupuesto
      </Button>
      <ChangeBudgetLimit
        onClose={onClose}
        btnRef={btnRef}
        isOpen={isOpen}
        budgets={budgets}
      />
    </React.Fragment>
  );
}
