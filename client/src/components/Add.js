import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import axios from "axios";

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

const InputText = ({ name, field, fields, setFields }) => {
  return (
    <React.Fragment>
      <label>{name}</label>
      <input
        name="description"
        value={fields[field]}
        type="text"
        onChange={(e) => setFields({ ...fields, [field]: e.target.value })}
      />
    </React.Fragment>
  );
};

const InputNumber = ({ name, field, fields, setFields }) => {
  return (
    <React.Fragment>
      <label>{name}</label>
      <input
        name="description"
        value={fields[field]}
        type="number"
        onChange={(e) => {
          if (e.target.value) {
            setFields({ ...fields, [field]: e.target.value });
          }
        }}
      />
    </React.Fragment>
  );
};

const StyledDropdown = styled.div`
  div {
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
  }
  option {
    font-size: 14px;
  }
`;

const InputDropdown = ({ name, field, fields, setFields }) => {
  const options = [
    {
      value: "Food",
      label: "Comida",
    },
    {
      value: "House",
      label: "Hogar",
    },
    {
      value: "Tax",
      label: "Impuestos",
    },
    {
      value: "Entertainment",
      label: "Entretenimiento",
    },
    {
      value: "Various",
      label: "Varios",
    },
    {
      value: "Transport",
      label: "Transporte",
    },
  ];
  return (
    <React.Fragment>
      <StyledDropdown>
        <label>{name}</label>
        <Dropdown
          options={options}
          value={fields[field]}
          onChange={({ value }) => setFields({ ...fields, [field]: value })}
          placeholder="Selecciona una opcion..."
        />
      </StyledDropdown>
    </React.Fragment>
  );
};

const SubmitButton = () => {
  const StyledButton = styled.button`
    margin-top: 1.5em;
    padding: 0.7em;
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
    font-weight: bold;
    border: none;
    border-radius: 10px;
  `;

  return <StyledButton type="submit">Agregar</StyledButton>;
};

const AddPage = ({ walletId, closeAddExpenseDialog, expenses }) => {
  const [fields, setFields] = useState({ fromWallet: walletId });
  return (
    <React.Fragment>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .put(`http://localhost:5000/wallet/${walletId}/new-expense`, fields)
            .then(({ data }) => {
              console.log(data);
              expenses.push(fields)
              closeAddExpenseDialog(false);
            })
            .catch(console.log);
        }}
      >
        <InputText
          name="Descripcion"
          field="description"
          fields={fields}
          setFields={setFields}
        />
        <InputNumber
          name="Monto"
          field="amount"
          fields={fields}
          setFields={setFields}
        />
        <InputDropdown
          name="Seccion"
          field="section"
          fields={fields}
          setFields={setFields}
        />
        <SubmitButton />
      </StyledForm>
    </React.Fragment>
  );
};

export default AddPage;