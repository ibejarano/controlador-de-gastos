import React, { useState } from "react";
import styled from "styled-components";

import SubmitButton from "../components/SubmitButton";

const StyledForm = styled.form`
  background: yellow;
  display: flex;
  flex-flow: column nowrap;
  max-width: 400px;
  border-radius: 10px;
  padding: 15px;
  width: 100%;

  label {
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme.color.mainBackground};
  }

  input {
    margin-bottom: 15px;
    background: ${(props) => props.theme.color.mainBackground};
    color: ${(props) => props.theme.color.yellowText};
    font-size: 0.85em;
    border: none;
    border-radius: 0.5em;
    padding: 0.4em;
  }
`;

const Form = ({ onSubmit, isSubmitting, formId, register }) => {
  const [input, setInput] = useState({
    username: "Nacho Dev",
    email: "test@test.dev",
    password: "testing",
    confPassword: "testing",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlePasswordConfirmation = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <StyledForm
        id={formId}
        onSubmit={async (e) => {
          e.preventDefault();
          onSubmit(input);
        }}
      >
        {register && (
          <React.Fragment>
            <label>Nombre de usuario</label>
            <input
              name="username"
              type="text"
              placeholder="Requerido"
              onChange={handleChange}
            />
          </React.Fragment>
        )}

        <label>E-mail</label>
        <input
          name="email"
          type="email"
          placeholder="Requerido"
          onChange={handleChange}
          value={input.email}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={input.password}
        />
        {register && (
          <React.Fragment>
            <label>Repetir password</label>
            <input
              name="confPassword"
              type="password"
              value={input.confPassword}
              onChange={handlePasswordConfirmation}
            />
          </React.Fragment>
        )}
      </StyledForm>
      <SubmitButton
        text={ register ? "Registrarse" : "Ingresar" }
        fontSize="18px"
        form={formId}
        fullWidth
        isSubmitting={isSubmitting}
      />
    </React.Fragment>
  );
};

export default Form;
