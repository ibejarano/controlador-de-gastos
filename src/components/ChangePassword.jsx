import React from "react";
import {
  Container,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { changePassword } from "../helpers/requests";
import GoBackHeading from "./GoBackHeading";

export default function ChangePassword() {
  return (
    <Container p="24px">
      <GoBackHeading>Cambiar contraseña</GoBackHeading>
      <Formik
        initialValues={{ password: "", newPass: "", newPassConfirmation: "" }}
        onSubmit={(values, actions) => {
          changePassword(values)
            .then(({ message }) => toast.success(message))
            .catch(() => toast.error("La contraseña actual es incorrecta"))
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(props) => (
          <Form>
            <Field name="password">
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <Input {...field} type="password" id="password" />
                </FormControl>
              )}
            </Field>
            <Field name="newPass">
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="newPass">Nueva contraseña</FormLabel>
                  <Input {...field} type="password" id="newPass" />
                </FormControl>
              )}
            </Field>
            <Field name="newPassConfirmation">
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="newPassConfirmation">
                    Repita nueva contraseña
                  </FormLabel>
                  <Input {...field} type="password" id="newPassConfirmation" />
                </FormControl>
              )}
            </Field>
            <Button
              isLoading={props.isSubmitting}
              colorScheme="teal"
              type="submit"
              my="8px"
            >
              Cambiar contraseña
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
