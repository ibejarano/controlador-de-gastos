import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import { login } from "../helpers/requests";
import { useUser } from "../context/UserContext";

import Error from "../components/Error";
import TitleContainer from "../components/TitleContainer";
import TitleAndSubtitle from "../components/TitleAndSubtitle";
import Form from "../components/Form";

const FormsContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
`;

const LoginPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { dispatch } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitLogin = async (input) => {
    setIsSubmitting(true);
    const { data, err } = await login(input);
    if (err) {
      setError(err.message || err.response.data.error);
    } else {
      dispatch({ type: "set-user", payload: data });
      setRedirect("/wallets");
    }
    setIsSubmitting(false);
  };

  return (
    <React.Fragment>
      <TitleContainer title="Bienvenid@!" />
      <FormsContainer>
        <TitleAndSubtitle title="Login" />
        <Form
          isSubmitting={isSubmitting}
          onSubmit={submitLogin}
          formId="login-form"
        />
        {error && <Error error={error} />}
        {redirect && <Redirect to={redirect} />}
      </FormsContainer>
      <Link to="/register">
        <TitleAndSubtitle title="Click aqui para registrarse" />
      </Link>
    </React.Fragment>
  );
};

export default LoginPage;
