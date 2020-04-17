import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
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

const StyledDropdown = styled.div`
  div {
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
  }
  option {
    font-size: 14px;
  }
`;

const OPTIONS_DROPDOWN = ["usd", "eur", "ars", "brl"];

const StyledButton = styled.button`
  margin-top: 1.5em;
  padding: 0.7em;
  background: ${(props) => props.theme.color.mainBackground};
  color: ${(props) => props.theme.color.yellowText};
  font-weight: bold;
  border: none;
  border-radius: 10px;
`;

const SubmitButton = () => {
  return <StyledButton type="submit">Agregar</StyledButton>;
};

const AddWallet = ({setUserInfo}) => {
  const [fields, setFields] = useState({
    name: "TEST",
    description: "TEST DESCRIPTION",
    balance: 12200.0,
    currency: "ARS",
  });

  const [redirect, setRedirect] = useState(null);

  const { description, balance, currency, name } = fields;

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const USERID_TEST = "5e89de48d8784a4727158acc";

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post(`http://localhost:5000/wallet/new/${USERID_TEST}`, fields)
          .then(({ data }) => {
            setUserInfo(data.userInfo)
            setRedirect(`/details?walletId=${data.walletId}`)})
          .catch(console.log);
      }}
    >
      <label>Nombre</label>
      <input name="name" value={name} type="text" onChange={handleChange} />
      <label>Descripcion</label>
      <input
        name="description"
        value={description}
        type="text"
        onChange={handleChange}
      />
      <label>Monto Inicial</label>
      <input
        name="balance"
        value={balance}
        type="number"
        onChange={handleChange}
      />
      <label>Seccion</label>
      <StyledDropdown>
        <Dropdown
          options={OPTIONS_DROPDOWN.map((opt) => opt.toUpperCase())}
          value={currency}
          onChange={(e) => setFields({ ...fields, currency: e.value })}
          placeholder="Selecciona una opcion..."
        />
      </StyledDropdown>
      <SubmitButton />
    </StyledForm>
  );
};

export default AddWallet;
