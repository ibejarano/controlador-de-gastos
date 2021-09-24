import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import Dropdown from "react-dropdown";
import { toast } from "react-toastify";

import { useUser } from "../context/UserContext";

import { addWallet } from "../helpers/requests";

import TitleAndSubtitle from "./common/TitleAndSubtitle";

const StyledForm = styled.form`
  background: ${(props) => props.theme.color.yellowText};
  display: flex;
  flex-flow: column nowrap;
  padding: 1em;
  border-radius: 1em;
  margin: 2em auto;
  max-width: 450px;
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

export default function AddWallet() {
  const { dispatch } = useUser();
  const [fields, setFields] = useState({
    name: "TEST",
    description: "TEST DESCRIPTION",
    balance: 12200.0,
    currency: "ars",
  });

  const [redirect, setRedirect] = useState(null);
  const { description, balance, currency, name } = fields;

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <React.Fragment>
      <TitleAndSubtitle title="Agregar billetera"/>
      <StyledForm
        onSubmit={async (e) => {
          e.preventDefault();
          const { err, data } = await addWallet(fields);
          if (err) {
            toast.error(err.response.data.error);
          } else {
            dispatch({
              type: "set-user",
              payload: data,
            });
            setRedirect("/wallets");
          }
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
    </React.Fragment>
  );
}
