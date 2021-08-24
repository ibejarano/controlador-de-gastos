import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../components/common/Modal";
import EditBudget from "./EditBudget";

const BudgetContainer = styled.div`
  background: ${(props) => props.theme.color.yellowText};
  color: ${(props) => props.theme.color.mainBackground};
  border-radius: 1em;
  position: relative;
  padding: 0.75em;
  margin: 1.5em 0;

  .container_budget:last-child {
    border: none;
  }

  .container_budget {
    display: flex;
    flex-flow: column nowrap;
    border-bottom: 1px solid black;
    padding-bottom: 16px;
  }

  p {
    font-size: 16px;
    font-weight: bold;
    margin: 0.5em 0;
    width: 100%;
    text-align: center;
    text-transform: capitalize;
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
  height: 1em;
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
    height: 1em;
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

export default function DisplayBudget({ budgets, setLoading }) {
  const [isModal, setIsModal] = useState(false);
  const [currBudget, setcurrBudget] = useState({});

  const handleClick = (section, limit) => {
    setIsModal(true);
    setcurrBudget({ limit, section });
  };

  return (
    <BudgetContainer>
      {budgets.map(({ section, current, limit }) => (
        <div className="container_budget" key={section} onClick={() => handleClick(section, limit)}>
          <p>
            {section} ${current} / ${limit}
          </p>
          <ProgressBar barWidth={Math.floor((current * 100) / limit)}>
            {Math.floor((current * 100) / limit) && (
              <div className="filled-progress-bar"></div>
            )}
          </ProgressBar>
        </div>
      ))}
      {isModal && (
        <Modal>
          <EditBudget setLoading={setLoading} setOpenDialog={setIsModal} {...currBudget} />
        </Modal>
      )}
    </BudgetContainer>
  );
}
