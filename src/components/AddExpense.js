import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import { addExpense } from "../helpers/requests";
import { DualRing } from "react-spinners-css";

import { useUser } from "../context/UserContext";

const StyledForm = styled.form`
  background: ${(props) => props.theme.color.yellowText};
  display: flex;
  flex-flow: column nowrap;
  padding: 1em;
  border-radius: 1em;
  margin: 0 24px;
  label {
    font-weight: bold;
  }

  input {
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
  }
`;

const StyledDropdown = styled.div`
  div {
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
  }
  option {
    font-size: 14px;
  }
`;

const StyledButton = styled.button`
  margin-top: 1.5em;
  padding: 0.7em;
  background: ${(props) => props.theme.color.mainBackground};
  color: ${(props) => props.theme.color.yellowText};
  font-weight: bold;
  border: none;
  border-radius: 10px;
  height: 45px;
`;

const SubmitButton = ({ isSubmitting }) => {
  return (
    <StyledButton type="submit">
      {isSubmitting ? (
        <DualRing style={{ padding: 0, marginTop: 0 }} size={25} />
      ) : (
        "Agregar"
      )}
    </StyledButton>
  );
};

const AddExpense = ({ walletId, setWallet }) => {
  const {
    user: { sectionsSaved },
  } = useUser();
  const [fields, setFields] = useState({
    description: "papa",
    amount: 150,
    section: "comida",
  });
  const { description, amount, section } = fields;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <StyledForm
      onSubmit={async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { data, err } = await addExpense(walletId, fields);
        if (err) {
          alert(err.response.data.error);
        } else {
          setWallet(data.wallet);
        }
        setIsSubmitting(false);
      }}
    >
      <label>Descripcion</label>
      <input
        name="description"
        value={description}
        type="text"
        onChange={handleChange}
      />
      <label>Monto</label>
      <input
        name="amount"
        value={amount}
        type="number"
        onChange={handleChange}
      />
      <label>Seccion</label>
      <StyledDropdown>
        <Dropdown
          options={sectionsSaved}
          value={section}
          onChange={(e) => setFields({ ...fields, section: e.value })}
          placeholder="Selecciona una opcion..."
        />
      </StyledDropdown>
      <SubmitButton isSubmitting={isSubmitting} />
    </StyledForm>
  );
};

export default AddExpense;
