import React from "react";
import styled from "styled-components";
import TitleContainer from "../components/TitleContainer";

import OptionButton from "../components/OptionButton";

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
    background: ${(props) => (props.barWidth < 101 ? "#b368e1" : "red")};
    min-width: 10%;
    width: ${(props) => (props.barWidth < 100 ? `${props.barWidth}%` : "100%")};
    margin: 0;
    border-radius: 1em;
    height: 2em;
    position: relative;
    top: 0;
  }
`;

function DisplayBudget({ budget }) {
  const progress = Math.floor((budget.current * 100) / budget.limit);
  return (
    <BudgetContainer>
      <h1>{budget.section}</h1>
      <p>
        ${budget.current} / ${budget.limit}
      </p>
      <OptionButton
        options={[
          {
            legend: "Actualizar",
            onClick: () => console.log("Actualizar Budget a implementar!"),
          },
        ]}
      />
      <ProgressBar barWidth={progress}>
        <div className="filled-progress-bar"></div>
      </ProgressBar>
    </BudgetContainer>
  );
}

function DisplayNoConfiguredBudget({ budget }) {
  return (
    <BudgetContainer>
      <h1>{budget.section}</h1>
      <p>Presupuesto no configurado</p>
    </BudgetContainer>
  );
}

export default function BudgetPage({ data }) {
  return (
    <React.Fragment>
      <TitleContainer title="Presupuestos" />
      {data.map((budget) => {
        return budget.isConfigured ? (
          <DisplayBudget key={budget.section} budget={budget} />
        ) : (
          <DisplayNoConfiguredBudget key={budget.section} budget={budget} />
        );
      })}
    </React.Fragment>
  );
}
