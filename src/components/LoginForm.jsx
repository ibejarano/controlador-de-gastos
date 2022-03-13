import React from "react";
import { Formik, Form, Field } from "formik";
import { Container, Center } from "@chakra-ui/react";

import InputText from "./InputText";
import Button from "./Button";

export default function LoginRegisterForm() {
  return (
    <Container border="1px solid black" bg="teal">
      <Formik
        initialValues={{
          email: "test@test.dev",
          password: "testing",
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log("submiting...");
            // onSubmit(input);
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <InputText id="email" label="E-mail" fieldData={field} />
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <InputText id="password" label="Password" fieldData={field} />
              )}
            </Field>
            <Center m="20px 0">
              <Button isLoading={props.isSubmitting} type="submit" primary text="Ingresar" />
            </Center>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
