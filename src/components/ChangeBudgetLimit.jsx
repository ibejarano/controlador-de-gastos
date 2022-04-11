import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { toast } from "react-toastify";

import { configureBudget } from "../helpers/requests";

export default function ChangeBudgetLimit({
  onClose,
  btnRef,
  isOpen,
  budgets,
  setBudgets,
}) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Cambiar limite de presupuesto</DrawerHeader>

        <Formik
          id="change-budget"
          initialValues={{ limit: "", section: "" }}
          onSubmit={(values, actions) => {
            const { limit, section } = values;
            if (limit > 0) {
              configureBudget(section, limit).then(
                ({ message, data: { budgets } }) => {
                  setBudgets(budgets);
                  actions.setSubmitting(false);
                  toast.success(message);
                  onClose();
                }
              );
            }
          }}
        >
          {(props) => (
            <Form>
              <DrawerBody>
                <Field name="section">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="section">Seccion</FormLabel>
                      <Select
                        {...field}
                        placeholder="Seleccione seccion"
                        name="section"
                      >
                        {budgets.map((budget, idx) => (
                          <option key={budget.section} value={budget.section}>
                            {idx + 1} - {budget.section}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Field name="limit">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="limit">Limite</FormLabel>
                      <Input
                        {...field}
                        placeholder="Nuevo limite"
                        name="limit"
                        type="number"
                      />
                    </FormControl>
                  )}
                </Field>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  isLoading={props.isSubmitting}
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                >
                  Guardar
                </Button>
              </DrawerFooter>
            </Form>
          )}
        </Formik>
      </DrawerContent>
    </Drawer>
  );
}
