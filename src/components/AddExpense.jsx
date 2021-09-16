import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";

import Button from "../components/common/Button";
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
      <StyledDropdown>
        <Dropdown
          options={sectionsSaved}
          value={section}
          onChange={(e) => setFields({ ...fields, section: e.value })}
          placeholder="Selecciona una opcion..."
        />
      </StyledDropdown>
      <SubmitButton isSubmitting={isSubmitting} />
      <Button onClick={() => toggleModal(false)}>Cancelar</Button>
    </StyledForm>
  );
};

export default AddExpense;
