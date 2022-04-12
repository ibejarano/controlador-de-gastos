import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";

import { login } from "../helpers/requests";
import { useUser } from "../context/UserContext";
import {
  Container,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { dispatch } = useUser();

  useEffect(() => {
    dispatch({ type: "set-title", payload: "Ingreso" });
  }, [dispatch]);

  return (
    <Container p="24px" shadow="xs" h="100vh">
      <Heading size="xl" my="12px">
        Bienvenid@!
      </Heading>
      <Heading size="md" my="12px">
        Ingrese su cuenta
      </Heading>
      <Formik
        initialValues={{ email: "test1@test.com", password: "terere" }}
        onSubmit={(values, actions) => {
          login(values).then(({ data, err }) => {
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
            <Field name="email">
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input {...field} id="email" />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <Input {...field} id="password" type="password" />
                </FormControl>
              )}
            </Field>
            <Button
              isLoading={props.isSubmitting}
              colorScheme="teal"
              type="submit"
              my="8px"
            >
              Ingresar
            </Button>
          </Form>
        )}
      </Formik>
      {redirect && <Redirect to={redirect} />}
      <Text>
        No tienes una cuenta?
        <Link to="/register">Registrarse</Link>
      </Text>
    </Container>
  );
};

export default LoginPage;
