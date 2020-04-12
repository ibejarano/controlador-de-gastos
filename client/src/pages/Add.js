import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";

import TitleContainer from "../components/TitleContainer";

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
  const options = ["Comida", "Casa", "Impuestos"];
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

const AddPage = ({ userInfo }) => {
  const [fields, setFields] = useState({});
  return (
    <React.Fragment>
      <TitleContainer walletName="Agregar nuevo registro" />
      <StyledForm>
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
        <InputDropdown
          name="Billetera"
          field="wallet"
          fields={fields}
          setFields={setFields}
        />
      </StyledForm>
    </React.Fragment>
  );
};

export default AddPage;
