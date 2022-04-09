import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Heading, Box } from "@chakra-ui/react";

import AddWallet from "../components/AddWallet";
import AdminWallets from "../components/AdminWallets";
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
      <LinkCard to="/config/admin_wallet">Administrar billeteras</LinkCard>

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
  }, [dispatch]);

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/config/add_wallet">
          <AddWallet />
        </Route>
        <Route exact path="/config/admin_wallet">
          <AdminWallets />
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
