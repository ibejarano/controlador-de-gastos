import React from "react";
import { Formik, Form, Field } from "formik";
import { Container, Center } from "@chakra-ui/react";

import InputText from "./InputText";
import Button from "./Button";

export default function LoginRegisterForm({ submitLogin }) {
  return (
    <Container border="1px solid black" bg="teal">
      <Formik
        initialValues={{
          email: "test1@test.com",
          password: "test",
        }}
        onSubmit={(values, actions) => {
          submitLogin(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <Field name="email">
              {({ field }) => (
                <InputText id="email" label="E-mail" fieldData={field} />
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <InputText id="password" label="Password" fieldData={field} />
              )}
            </Field>
            <Center m="20px 0">
              <Button
                isLoading={props.isSubmitting}
                type="submit"
                primary
                text="Ingresar"
              />
            </Center>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
