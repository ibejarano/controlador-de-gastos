import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { Formik, Form, Field } from "formik";
import { Container, Center, Button } from "@chakra-ui/react";

import { useUser } from "../context/UserContext";
import { addWallet } from "../helpers/requests";

import GoBackHeading from "./GoBackHeading";
import InputText from "./InputText";

export default function AddWallet() {
  const { dispatch } = useUser();
  const [redirect, setRedirect] = useState(null);

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
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
        <Container p="28px">
          <GoBackHeading>Agregar billetera</GoBackHeading>
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
              <Button isLoading={props.isSubmitting} type="submit">
                Agregar
              </Button>
            </Center>
          </Form>
        </Container>
      )}
    </Formik>
  );
}
