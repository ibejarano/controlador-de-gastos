import React from "react";
import { Formik, Form, Field } from "formik";
import { Container, Center, Heading } from "@chakra-ui/react";

import InputText from "./InputText";
import Button from "./Button";

export default function CustomForm({
  submitAction,
  form_vars,
  initialValues = {},
}) {
  return (
    <Container border="1px solid black" bg="teal">
      <Heading>{form_vars.title}</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)
          submitAction(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            {form_vars.fields.map((f) => (
              <Field key={f.name} name={f.name}>
                {({ field }) => (
                  <InputText id={f.type} label={f.label} fieldData={field} />
                )}
              </Field>
            ))}
            <Center m="20px 0">
              <Button
                isLoading={props.isSubmitting}
                type="submit"
                primary
                text={form_vars.buttonText}
              />
            </Center>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
