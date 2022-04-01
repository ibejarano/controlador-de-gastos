import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../helpers/requests";
import { useUser } from "../context/UserContext";
import TitleContainer from "../components/common/Title";
import TitleAndSubtitle from "../components/common/TitleAndSubtitle";
import LoginForm from "../components/LoginForm";

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
      <TitleContainer title="Bienvenid@!" />
      <LoginForm submitLogin={submitLogin} />
      {redirect && <Redirect to={redirect} />}
      <Link to="/register">
        <TitleAndSubtitle title="Click aqui para registrarse" />
      </Link>
    </React.Fragment>
  );
};

export default LoginPage;
