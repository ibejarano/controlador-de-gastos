import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../helpers/requests";
import { useUser } from "../context/UserContext";
import LoginForm from "../components/LoginForm";

const LOGIN_VARS = {
  title: "Bienvenid@!",
  buttonText: "Ingresar",
  fields: [
    {
      name: "email",
      label: "E-mail",
    },

    {
      name: "password",
      label: "Contraseña",
    },
  ],
};

const LoginPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { dispatch } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogin = async (input) => {
    setIsSubmitting(true);
    const { data, err } = await login(input);
    if (err) {
      toast.error(err.message || err.response.data.error, {
        position: "bottom-center",
      });
    } else {
      dispatch({ type: "set-user", payload: data });
      setRedirect("/wallets");
    }
    setIsSubmitting(false);
  };

  return (
    <React.Fragment>
      <LoginForm
        submitAction={submitLogin}
        form_vars={LOGIN_VARS}
        initialValues={{ email: "test1@test.com", password: "test" }}
      />
      {redirect && <Redirect to={redirect} />}
      <Link to="/register">Registrarse</Link>
    </React.Fragment>
  );
};

export default LoginPage;
