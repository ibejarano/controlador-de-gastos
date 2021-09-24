import React, { useState } from "react";
import styled from "styled-components";

import Button from "../components/common/Button";
import Dropdown from "../components/common/Dropdown"

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
    margin: 8px 0;
  }

  button {
    margin: 8px 0;
  }

  input {
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
    font-size: 16px;
    padding: 8px 4px;
  }
`;

const SubmitButton = ({ isSubmitting }) => {
  return (
    <Button type="submit">
      {isSubmitting ? (
        <DualRing style={{ padding: 0, marginTop: 0 }} size={25} />
      ) : (
        "Agregar"
      )}
    </Button>
  );
};

const AddExpense = ({ walletId, setWallet, toggleModal, isIncome = false }) => {
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
    console.log(e.target.name)
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <StyledForm
      onSubmit={async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        fields["amount"] = isIncome ? fields["amount"] : -1 * fields["amount"];
        const { data, err } = await addExpense(walletId, fields);
        if (err) {
          alert(err.response.data.error);
        } else {
          setWallet(data.wallet);
        }
        setIsSubmitting(false);
        toggleModal(false);
      }}
    >
      <h3>{isIncome ? "Nuevo ingreso" : "Nuevo gasto"}</h3>
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
      <Dropdown
        options={sectionsSaved}
        value={section}
        handleChange={handleChange}
      />
      <SubmitButton isSubmitting={isSubmitting} />
      <Button onClick={() => toggleModal(false)}>Cancelar</Button>
    </StyledForm>
  );
};

export default AddExpense;
