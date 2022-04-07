import React, { useState } from "react";
import { Input, Button, Box, Heading } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { changePassword } from "../helpers/requests";

export default function ChangePassword() {
  const [password, setPassword] = useState({});

  const handleChange = (e) => {
    e.persist();
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { err } = await changePassword(password);
    if (err) {
      toast.error(err);
    }
  };

  const { current, newPass, newPassConfirmation } = password;

  return (
    <Box p="10px">
      <Heading size="md" my="8px">
        Cambiar contraseña
      </Heading>
      <Input
        fontWeight="bold"
        mb="1rem"
        name="current"
        type="password"
        value={current}
        placeholder="Contraseña actual"
        onChange={handleChange}
      />
      <Input
        fontWeight="bold"
        mb="1rem"
        name="newPass"
        type="password"
        value={newPass}
        placeholder="Nueva contraseña"
        onChange={handleChange}
      />
      <Input
        fontWeight="bold"
        mb="1rem"
        name="newPassConfirmation"
        type="password"
        placeholder="Repetir nueva contraseña"
        value={newPassConfirmation}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Confirmar cambio</Button>
    </Box>
  );
}
