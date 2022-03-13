import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

export default function LoginRegisterForm({
  onSubmit,
  isSubmitting,
  formId,
  register,
}) {
  const [input, setInput] = useState();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlePasswordConfirmation = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <Formik
      initialValues={{
        username: "Nacho Dev",
        email: "test@test.dev",
        password: "testing",
        confPassword: "testing",
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
          <Field name="name">
            {({ field, form }) => (
              <FormControl>
                {register && (
                  <React.Fragment>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <Input
                      name="username"
                      type="text"
                      placeholder="Requerido"
                      onChange={handleChange}
                    />
                  </React.Fragment>
                )}

                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Requerido"
                  onChange={handleChange}
                  value={input.email}
                />
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={input.password}
                />
                {register && (
                  <React.Fragment>
                    <FormLabel>Repetir password</FormLabel>
                    <input
                      name="confPassword"
                      type="password"
                      value={input.confPassword}
                      onChange={handlePasswordConfirmation}
                    />
                  </React.Fragment>
                )}
              </FormControl>
            )}
          </Field>

          <Button type="submit" isLoading={props.isSubmitting}>
            {register ? "Registrarse" : "Ingresar"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
