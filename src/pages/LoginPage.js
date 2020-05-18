import React, { useState, useContext } from "react";
import styled from "styled-components";
import { login, register } from "../helpers/requests";
import UserContext from "../context/UserContext";

import SubmitButton from "../components/SubmitButton";
import Error from "../components/Error";
import TitleContainer from "../components/TitleContainer";
import TitleAndSubtitle from "../components/TitleAndSubtitle";

const FormsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;

  .form-container {
    margin: 0;
    padding: 0;
    width: 300px;
  }
`;

const StyledForm = styled.form`
  background: yellow;
  display: flex;
  flex-flow: column nowrap;
  /* max-width: 630px; */
  border-radius: 10px;
  padding: 15px;
  padding-bottom: 0;

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

const LoginPage = () => {
  const { dispatchUser } = useContext(UserContext);
  const [input, setInput] = useState({
    username: "",
    email: "test@mail.com",
    password: "test",
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
    <React.Fragment>
      <TitleContainer title="Bienvenid@!" />
      <FormsContainer>
        <div className="form-container">
          <TitleAndSubtitle title="Login" />
          <StyledForm
            id="login-form"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const { data, err } = await login(input);
              if (err) {
                setError(err.message || err.response.data.error);
              } else {
                console.log(data);
                dispatchUser({ type: "set-user", payload: data });
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
              value={input.email}
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={input.password}
            />
          </StyledForm>
          <SubmitButton
            text="Ingresar"
            fontSize="18px"
            fullWidth
            form="login-form"
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="form-container">
          <TitleAndSubtitle title="No posee cuenta? Registrate!" />
          <StyledForm
            id="register-form"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const { data, err } = await register(input);
              if (err) {
                setError(err);
              } else {
                dispatchUser({ type: "set-user", payload: data });
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
          </StyledForm>
          <SubmitButton
            form="register-form"
            text="Unirse"
            isSubmitting={isSubmitting}
            fontSize="18px"
            fullWidth
          />
        </div>
        {error && <Error error={error} />}
      </FormsContainer>
    </React.Fragment>
  );
};

export default LoginPage;
