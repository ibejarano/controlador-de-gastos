import React, { useState } from "react";
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
  Text,
} from "@chakra-ui/react";

import { toast } from "react-toastify";

import { configureBudget } from "../helpers/requests";

export default function ChangeBudgetLimit({
  onClose,
  btnRef,
  isOpen,
  budgets,
}) {
  const [current, setCurrent] = useState({});

  const handleChange = (e) => {
    e.persist();
    setCurrent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeSection = (e) => {
    e.persist();
    const idx = budgets.map((b) => b.section).indexOf(e.target.value);
    const limit = budgets[idx].limit;
    setCurrent((prev) => ({ ...prev, [e.target.name]: e.target.value, limit }));
  };

  const handleSubmit = async () => {
    const { newLimit, limit, section } = current;
    if ((newLimit !== limit) & (newLimit > 0)) {
      const { message } = await configureBudget(section, newLimit);
      toast.success(message);
    }
  };

  const { limit, newLimit, section } = current;

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

        <DrawerBody>
          <Select
            placeholder="Seleccione seccion"
            onChange={handleChangeSection}
            value={section}
            name="section"
          >
            {budgets.map((budget, idx) => (
              <option key={budget.section} value={budget.section}>
                {idx + 1} - {budget.section}
              </option>
            ))}
          </Select>
          <Text>Limite actual {limit}</Text>
          <Input
            placeholder="Nuevo limite"
            name="newLimit"
            onChange={handleChange}
            type="number"
            value={newLimit}
          />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Guardar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
