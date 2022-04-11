import React, { useEffect, useRef, useState } from "react";
import { Button, ScaleFade, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useUser } from "../context/UserContext";

import WalletContainer from "../components/WalletContainer";

import { getWallets } from "../helpers/requests";
import AddExpense from "../components/AddExpense";
import LoadingScreen from "../components/Loading";

export default function HomePage() {
  const { user, dispatch } = useUser();
  const [isLoading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { wallets, sectionsSaved, username } = user;
  useEffect(() => {
    async function fetchWallets() {
      console.log("fetching wallets");
      const { data } = await getWallets();
      dispatch({ type: "set-wallets", payload: data });
      setLoading(false);
    }
    if (isLoading) {
      fetchWallets();
    }
    dispatch({ type: "set-title", payload: `Bienvenid@ ${username}` });
  }, [dispatch, username, wallets, isLoading]);

  if (isLoading) return <LoadingScreen />;

  return (
    <React.Fragment>
      <ScaleFade in={wallets.length} initialScale={0.8} offsetY='20px'>
        {wallets && <WalletContainer wallets={wallets} />}
      </ScaleFade>
      <Button
        pos="fixed"
        bottom="10vh"
        left="60%"
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="solid"
        ref={btnRef}
        onClick={onOpen}
      >
        Nuevo Gasto
      </Button>
      <AddExpense
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        wallets={wallets}
        sections={sectionsSaved}
      />
    </React.Fragment>
  );
}
