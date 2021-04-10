import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleContainer from "../components/TitleContainer";

import DotsButton from "../components/common/DotsButton";
import { useUser } from "../context/UserContext";

import { configureBudget, getBudgets } from "../helpers/requests";

const BudgetContainer = styled.div`
  background: ${(props) => props.theme.color.yellowText};
  color: ${(props) => props.theme.color.mainBackground};
  border-radius: 1em;
  position: relative;
  padding: 0.75em;
  margin: 1.5em 0;

  h1 {
    font-size: 18px;
    margin: 0;
    text-transform: capitalize;
  }

  p {
    font-size: 14px;
    font-weight: bold;
    margin: 0.5em 0;
    width: 100%;
    text-align: center;
  }

  button.dropdown-options {
    border: none;
    background: inherit;
    color: ${(props) => props.theme.color.purpleText};
    font-weight: bold;
    font-size: 1.1em;
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    padding: 0.25em 0.4em;
    cursor: pointer;
  }

  button.option {
    background: ${(props) => props.theme.color.purpleText};
    color: ${(props) => props.theme.color.yellowText};
    font-weight: bold;
    font-size: 0.8em;
    position: absolute;
    right: 3em;
    top: 2em;
    padding: 0.25em 0.4em;
    border: none;
  }
`;

const ProgressBar = styled.div`
  background: ${(props) => props.theme.color.purpleText};
  width: 100%;
  margin: 0;
  border-radius: 1em;
  height: 2em;
  position: relative;

  .filled-progress-bar {
    background: ${(props) =>
      props.barWidth < 101
        ? "linear-gradient(270deg,  #e73c7e, #a65cdc)"
        : "red"};
    min-width: 10%;
    width: ${(props) => (props.barWidth < 100 ? `${props.barWidth}%` : "100%")};
    margin: 0;
    border-radius: 1em;
    height: 2em;
    position: relative;
    background-size: 400% 400%;
    top: 0;
    animation: MoveGradient 2s ease infinite;
  }

  @keyframes MoveGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

function ConfigureBudgetDialog({ setOpenDialog, section, currentLimit = 0 }) {
  const [limit, setLimit] = useState(currentLimit);
  const { dispatch } = useUser();
  const saveConfiguration = async (e) => {
    e.preventDefault();
    if (limit) {
      const { data } = await configureBudget(section, limit);
      dispatch({ type: "set-budgets", payload: data.budgets });
    }
    setOpenDialog(false);
  };

  return (
    <form onSubmit={saveConfiguration}>
      <label>Nuevo Limite</label>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      <button type="submit">Guardar</button>
    </form>
  );
}

function DisplayBudget({ budget }) {
  const progress = Math.floor((budget.current * 100) / budget.limit);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <BudgetContainer>
      <h1>{budget.section}</h1>
      <p>
        ${budget.current} / ${budget.limit}
      </p>
      <DotsButton
        options={[
          {
            legend: "Actualizar",
            onClick: () => setOpenDialog(true),
          },
        ]}
      />
      {openDialog && (
        <ConfigureBudgetDialog
          setOpenDialog={setOpenDialog}
          currentLimit={budget.limit}
          section={budget.section}
        />
      )}
      {!openDialog && (
        <ProgressBar barWidth={progress}>
          {progress && <div className="filled-progress-bar"></div>}
        </ProgressBar>
      )}
    </BudgetContainer>
  );
}

function DisplayNoConfiguredBudget({ budget }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <BudgetContainer>
      <h1>{budget.section}</h1>
      {!openDialog && <p>Presupuesto no configurado</p>}
      {openDialog && (
        <ConfigureBudgetDialog
          setOpenDialog={setOpenDialog}
          section={budget.section}
        />
      )}
      <DotsButton
        options={[
          {
            legend: "Cambiar limite",
            onClick: () => setOpenDialog(true),
          },
        ]}
      />
    </BudgetContainer>
  );
}

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    async function fetchBudgets() {
      const { data } = await getBudgets();
      console.log("getting budgets!");
      setBudgets(data);
    }
    if (isLoading) {
      fetchBudgets();
      setIsloading(false);
    }
  }, []);

  return (
    <React.Fragment>
      <TitleContainer title="Presupuestos" />
      {budgets.map((budget) => {
        return budget.isConfigured ? (
          <DisplayBudget key={budget.section} budget={budget} />
        ) : (
          <DisplayNoConfiguredBudget key={budget.section} budget={budget} />
        );
      })}
    </React.Fragment>
  );
}
