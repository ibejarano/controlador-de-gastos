import React, { useState } from "react";
import { toast } from "react-toastify";
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
} from "@chakra-ui/react";

import { addExpense } from "../helpers/requests";
import { useUser } from "../context/UserContext";

const INITIAL_EXPENSE = {
  amount: "",
  description: "",
  walletId: "",
};

export default function AddExpense({
  onClose,
  btnRef,
  isOpen,
  wallets,
  sections,
}) {
  const { dispatch } = useUser();
  const [expense, setExpense] = useState(INITIAL_EXPENSE);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.persist();
    setExpense((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { walletId, description, amount, section } = expense;
    const { data } = await addExpense(walletId, {
      description,
      amount,
      section,
    });
    if (data) {
      const { wallet } = data;
      dispatch({ type: "update-wallet", payload: wallet });
      setExpense(INITIAL_EXPENSE);
      toast.success("Gasto registrado");
    } else {
      toast.error("Ha ocurrido un error");
    }
    setLoading(false);
  };

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
        <DrawerHeader>Nuevo gasto</DrawerHeader>

        <DrawerBody>
          <Select
            placeholder="Seleccione billetera"
            onChange={handleChange}
            value={expense.walletId}
            name="walletId"
          >
            {wallets.map((w, idx) => (
              <option key={w._id} value={w._id}>
                {idx + 1} - {w.name}
              </option>
            ))}
          </Select>
          <Input
            placeholder="Descripcion"
            name="description"
            onChange={handleChange}
            type="text"
            value={expense.description}
          />
          <Input
            placeholder="Monto $"
            name="amount"
            onChange={handleChange}
            type="number"
            value={expense.amount}
          />
          <Select
            placeholder="Seleccione seccion"
            onChange={handleChange}
            value={expense.section}
            name="section"
          >
            {sections.map((s, idx) => (
              <option key={idx} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            mr={3}
            onClick={handleSubmit}
          >
            Guardar
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            onClick={async () => {
              await handleSubmit();
              onClose();
            }}
          >
            Guardar y Cerrar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
