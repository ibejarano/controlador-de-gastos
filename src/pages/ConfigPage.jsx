import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Heading, Box } from "@chakra-ui/react";

import AddWallet from "../components/AddWallet";
import DeleteWallet from "../components/DeleteWallet";
import ChangeWalletName from "../components/ChangeWalletName";
import LinkCard from "../LinkCard";
import { useUser } from "../context/UserContext";

function ConfigOptions() {
  return (
    <Box p="10px">
      <Heading size="md" my="10px">
        Billeteras
      </Heading>

      <LinkCard to="/config/add_wallet">Agregar Billetera</LinkCard>
      <LinkCard to="/config/change_wallet_name">
        Administrar billeteras
      </LinkCard>

      <Heading size="md" my="10px">
        Usuario
      </Heading>
      <LinkCard to="/config">Cambiar contraseña</LinkCard>
      <LinkCard to="/config">Cambiar nombre</LinkCard>
      <LinkCard to="/config">Eliminar cuenta</LinkCard>
    </Box>
  );
}

export default function ConfigPage() {
  const { dispatch } = useUser();

  useEffect(() => {
    dispatch({ type: "set-title", payload: "Configuracion" });
  }, []);

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/config/add_wallet">
          <AddWallet />
        </Route>
        <Route exact path="/config/change_wallet_name">
          <ChangeWalletName />
        </Route>
        <Route path="/config">
          <ConfigOptions />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
