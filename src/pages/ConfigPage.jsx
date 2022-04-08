import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Heading, Box } from "@chakra-ui/react";

import AddWallet from "../components/AddWallet";
import DeleteWallet from "../components/DeleteWallet";
import ChangeWalletName from "../components/ChangeWalletName";
import LinkCard from "../LinkCard";
import { useUser } from "../context/UserContext";
import ChangePassword from "../components/ChangePassword";

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
      <LinkCard to="/config/delete_wallet">Eliminar billeteras</LinkCard>

      <Heading size="md" my="10px">
        Usuario
      </Heading>
      <LinkCard to="/config/change_password">Cambiar contraseña</LinkCard>
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
        <Route exact path="/config/delete_wallet">
          <DeleteWallet />
        </Route>
        <Route exact path="/config/change_password">
          <ChangePassword />
        </Route>
        <Route path="/config">
          <ConfigOptions />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
