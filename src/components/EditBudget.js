import React, { useState } from "react";
import styled from "styled-components";

import { configureBudget } from "../helpers/requests";
import { useUser } from "../context/UserContext";

const StyledForm = styled.form`
  background: yellow;
  width: 80%;
  margin: 0 auto;
  padding: 16px 12px;
  border-radius: 12px;

  h1 {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  input {
    width: 100%;
    margin-bottom: 0.7em;
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  button {
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    padding: 2px 4px;
  }
`;

export default function EditBudget({
  setLoading,
  setOpenDialog,
  limit,
  section,
}) {
  const [newLimit, setLimit] = useState(limit);
  const { dispatch } = useUser();
  const saveConfiguration = async (e) => {
    e.preventDefault();
    if (newLimit) {
      const { data } = await configureBudget(section, newLimit);
      dispatch({ type: "set-budgets", payload: data.budgets });
      setLoading(true);
    }
    setOpenDialog(false);
  };

  return (
    <StyledForm onSubmit={saveConfiguration}>
      <h1>Seccion: {section}</h1>
      <input
        type="number"
        value={newLimit}
        onChange={(e) => setLimit(e.target.value)}
      />
      <ButtonContainer>
        <button onClick={() => setOpenDialog(false)}>Cancelar</button>
        <button type="submit">Guardar</button>
      </ButtonContainer>
    </StyledForm>
  );
}
