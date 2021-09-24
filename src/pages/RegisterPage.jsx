import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { register } from "../helpers/requests";
import { useUser } from "../context/UserContext";

import TitleContainer from "../components/common/Title";
import TitleAndSubtitle from "../components/common/TitleAndSubtitle";
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

  const submitRegister = async (input) => {
    setIsSubmitting(true);
    const { data, err } = await register(input);
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
      <FormsContainer>
        <TitleAndSubtitle title="Registro" />
        <Form
          isSubmitting={isSubmitting}
          onSubmit={submitRegister}
          formId="register-form"
          register
        />
        {redirect && <Redirect to={redirect} />}
      </FormsContainer>
    </React.Fragment>
  );
};

export default LoginPage;
