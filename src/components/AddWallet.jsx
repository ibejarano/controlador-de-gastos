import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Formik, Form, Field } from "formik";
import {
  Container,
  Center,
  Heading,
  HStack,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { useUser } from "../context/UserContext";

import { addWallet } from "../helpers/requests";
import InputText from "./InputText";
import Button from "./Button";

export default function AddWallet() {
  const { dispatch } = useUser();
  const history = useHistory();
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
          <HStack>
            <ChakraButton onClick={history.goBack} leftIcon={<ArrowBackIcon />} />
            <Heading size="sm">Agregar nueva billetera</Heading>
          </HStack>
          <Form>
            <Field name="name">
              {({ field }) => <InputText id="name" fieldData={field} />}
            </Field>
            <Field name="description">
              {({ field }) => <InputText id="description" fieldData={field} />}
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
        </Container>
      )}
    </Formik>
  );
}
