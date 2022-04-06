import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Formik, Form, Field } from "formik";
import { Container, Center } from "@chakra-ui/react";
import { useUser } from "../context/UserContext";

import { addWallet } from "../helpers/requests";
import InputText from "./InputText";
import Button from "./Button";

export default function AddWallet() {
  const { dispatch } = useUser();

  const [redirect, setRedirect] = useState(null);

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Container shadow="md" mx="4px">
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        onSubmit={async (values, actions) => {
          const { err, data } = await addWallet(values);
          if (err) {
            toast.error(err.response.data.error);
          } else {
            dispatch({
              type: "set-user",
              payload: data,
            });
            actions.setSubmitting(false);
            setRedirect("/wallets");
          }
        }}
      >
        {(props) => (
          <Form>
            <Field name="name">
              {({ field }) => (
                <InputText id="name" label="Nombre" fieldData={field} />
              )}
            </Field>
            <Field name="description">
              {({ field }) => (
                <InputText
                  id="description"
                  label="Descripcion"
                  fieldData={field}
                />
              )}
            </Field>
            <Center m="20px 0">
              <Button
                isLoading={props.isSubmitting}
                type="submit"
                primary
                text="Agregar"
              />
            </Center>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
