import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { register } from "../helpers/requests";
import { useUser } from "../context/UserContext";
import CustomForm from "../components/LoginForm";

const REGISTER_VARS = {
  title: "Registro de nuevo usuario",
  buttonText: "Registrar",
  fields: [
    {
      name: "email",
      label: "E-mail",
      type: "text",
    },
    {
      name: "username",
      label: "Nombre de usuario",
      type: "text",
    },
    {
      name: "password",
      label: "Contraseña",
      type: "password",
    },
    {
      name: "confPassword",
      label: "Confirmar contraseña",
      type: "password",
    },
  ],
};

const RegisterPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { dispatch } = useUser();

  const submitRegister = async (input) => {
    const { data, err } = await register(input);
    if (err) {
      toast.error(err.message || err.response.data.error, {
        position: "bottom-center",
      });
    } else {
      dispatch({ type: "set-user", payload: data });
      setRedirect("/wallets");
    }
  };

  return (
    <React.Fragment>
      <CustomForm submitAction={submitRegister} form_vars={REGISTER_VARS} />
      {redirect && <Redirect to={redirect} />}
    </React.Fragment>
  );
};

export default RegisterPage;
