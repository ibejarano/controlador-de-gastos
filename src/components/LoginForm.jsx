import React from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

export default function LoginRegisterForm() {
  return (
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
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input {...field} id="email" placeholder="E-mail" />
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input {...field} id="password" placeholder="Password" />
              </FormControl>
            )}
          </Field>
          <Button type="submit" isLoading={props.isSubmitting}>
            Ingresar
          </Button>
        </Form>
      )}
    </Formik>
  );
}
