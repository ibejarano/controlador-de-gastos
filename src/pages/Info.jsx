import React, { useEffect } from "react";
import { Heading, List, ListItem, ListIcon, Box } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

import { useUser } from "../context/UserContext";

export default function InfoPage() {
  const { dispatch } = useUser();

  useEffect(() => {
    dispatch({ type: "set-title", payload: "Info" });
  }, [dispatch]);

  return (
    <Box p="16px">
      <Heading>Roadmap</Heading>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={PlusSquareIcon} color="green.500" />
          Versión Desktop
        </ListItem>
        <ListItem>
          <ListIcon as={PlusSquareIcon} color="green.500" />
          Dividir Gastos por Mes
        </ListItem>
      </List>
    </Box>
  );
}
