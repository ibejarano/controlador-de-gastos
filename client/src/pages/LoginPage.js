import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

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

const LoginPage = ({ setLoggedIn, setUser }) => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });

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
          if (input.confPassword === input.password) {
            const { data, message } = await axios.post(
              "http://localhost:5000/register",
              input
            );
            console.log(data, message);
          } else {
            console.log("no se puede");
          }
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
        <button type="submit">Unirse</button>
      </StyledForm>
      <h1>Log In</h1>
      <StyledForm
        onSubmit={async (e) => {
          e.preventDefault();
          if (input.email && input.password) {
            console.log(input);
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            };
            const { data } = await axios.post(
              "http://localhost:5000/login",
              input,
              config
            );
            if (data.user) {
              console.log(data);
              setLoggedIn(true);
              setUser(data.user);
            }
          } else {
            console.log("no se puede");
          }
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
        <button type="submit">Entrar</button>
      </StyledForm>
    </div>
  );
};

export default LoginPage;
