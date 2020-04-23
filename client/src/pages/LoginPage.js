import React, { useState } from "react";
import styled from "styled-components";
import { login, register } from "../helpers/requests";

import SubmitButton from "../components/SubmitButton";
import Error from "../components/Error";

const StyledForm = styled.form`
  background: yellow;
  display: flex;
  flex-flow: column nowrap;
  width: 70%;

  label {
    margin-top: 0.5em;
  }

  input {
    margin-bottom: 0.5em;
  }
`;

const LoginPage = ({ setUser }) => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlePasswordConfirmation = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Unirse</h1>
      <StyledForm
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          const { data, message, err } = await register(input);
          if (err) {
            setError(err);
          } else {
            setUser(data.user);
            console.log(message);
          }
          setIsSubmitting(false);
        }}
      >
        <label>Nombre de usuario</label>
        <input
          name="username"
          type="text"
          placeholder="Requerido"
          onChange={handleChange}
        />
        <label>E-mail</label>
        <input
          name="email"
          type="email"
          placeholder="Requerido"
          onChange={handleChange}
        />
        <label>Password</label>
        <input name="password" type="password" onChange={handleChange} />
        <label>Repetir password</label>
        <input
          name="confPassword"
          type="password"
          value={input.confPassword}
          onChange={handlePasswordConfirmation}
        />
        <SubmitButton text="Unirse" isSubmitting={isSubmitting} />
      </StyledForm>
      <h1>Log In</h1>
      <StyledForm
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          const { data, err } = await login(input);
          if (data) {
            setUser(data.user);
          } else {
            console.log(err)
            setError(err.message || err.response.data.error);
          }
          setIsSubmitting(false);
        }}
      >
        <label>E-mail</label>
        <input
          name="email"
          type="email"
          placeholder="Requerido"
          onChange={handleChange}
        />
        <label>Password</label>
        <input name="password" type="password" onChange={handleChange} />
        <SubmitButton text="Entrar" isSubmitting={isSubmitting} />
      </StyledForm>
      {error && <Error error={error} />}
    </div>
  );
};

export default LoginPage;
