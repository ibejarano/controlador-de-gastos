import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Container,
  Center,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export default function CustomForm({
  submitAction,
  form_vars,
  initialValues = {},
}) {
  return (
    <Formik initialValues={{ email: "test1@test.com", password: "terere" }}>
      {(props) => (
        <Form>
          <Field name="email">
            {({ field }) => (
              <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input {...field} id="email" placeholder="E-mail" />
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field }) => (
              <FormControl>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <Input {...field} id="password" placeholder="Contraseña" />
              </FormControl>
            )}
          </Field>
          <Button
            isLoading={props.isSubmitting}
            colorScheme="teal"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
