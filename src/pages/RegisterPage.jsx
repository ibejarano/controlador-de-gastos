import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Container,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { register } from "../helpers/requests";
import { useUser } from "../context/UserContext";

const RegisterPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { dispatch } = useUser();

  useEffect(() => {
    dispatch({ type: "set-title", payload: "Registrese" });
  }, [dispatch]);

  return (
    <Container p="24px" shadow="xs" h="100vh">
      <Heading size="xl" my="12px">
        Registrese
      </Heading>
      <Formik
        initialValues={{
          username: "test10",
          email: "test10@test.com",
          password: "test",
          confPassword: "test1",
        }}
        onSubmit={(values, actions) => {
          register(values).then(({ data, err }) => {
            if (err) {
              toast.error(err.message || err.response.data.error);
            } else {
              toast.success("Bienvenido! Redirigiendo...");
              dispatch({ type: "set-user", payload: data });
              setTimeout(() => {
                setRedirect("/wallets");
              }, 3000);
            }
            actions.setSubmitting(false);
          });
        }}
      >
        {(props) => (
          <Form>
            <Field name="username">
              {({ field }) => (
                <FormControl my="12px">
                  <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
                  <Input {...field} id="username" />
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field }) => (
                <FormControl my="12px">
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input {...field} id="email" />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <FormControl my="12px">
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <Input {...field} id="password" type="password" />
                </FormControl>
              )}
            </Field>
            <Field name="confPassword">
              {({ field }) => (
                <FormControl my="12px">
                  <FormLabel htmlFor="confPassword">
                    Repetir contraseña
                  </FormLabel>
                  <Input {...field} id="confPassword" type="password" />
                </FormControl>
              )}
            </Field>
            <Button
              isLoading={props.isSubmitting}
              colorScheme="teal"
              type="submit"
              my="8px"
            >
              Registrarse!
            </Button>
          </Form>
        )}
      </Formik>
      {redirect && <Redirect to={redirect} />}
      <Link to="/">Ya tienes una cuenta? Ingrese</Link>
    </Container>
  );
};

export default RegisterPage;
