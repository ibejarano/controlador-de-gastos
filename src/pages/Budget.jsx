import React, { useState, useEffect, useRef } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Button, ScaleFade, useDisclosure } from "@chakra-ui/react";

import { getBudgets } from "../helpers/requests";
import BudgetCard from "../components/BudgetCard";
import ChangeBudgetLimit from "../components/ChangeBudgetLimit";
import LoadingScreen from "../components/Loading";

import { useUser } from "../context/UserContext";

export default function BudgetPage() {
  const { dispatch } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    async function fetchBudgets() {
      const { data } = await getBudgets();
      setBudgets(data);
      setLoading(false);
    }
    if (isLoading) {
      fetchBudgets();
    }
    dispatch({ type: "set-title", payload: "Presupuestos" });
  }, [dispatch, isLoading]);

  if (isLoading) return <LoadingScreen />;

  return (
    <React.Fragment>
      <ScaleFade in={budgets.length} initialScale={0.8} offsetY="20px">
        {budgets.map((budget) => (
          <BudgetCard key={budget.section} {...budget} />
        ))}
      </ScaleFade>
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
        setBudgets={setBudgets}
      />
    </React.Fragment>
  );
}
