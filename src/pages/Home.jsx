import React, { useState, useEffect, useRef } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useUser } from "../context/UserContext";

import WalletContainer from "../components/WalletContainer";

import { getWallets } from "../helpers/requests";
import AddExpense from "../components/AddExpense";

export default function HomePage() {
  const {
    user: { wallets, sectionsSaved },
    dispatch,
  } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    async function fetchWallets() {
      const { data } = await getWallets();
      dispatch({ type: "set-wallets", payload: data });
    }
    fetchWallets();
  }, [dispatch]);

  return (
    <React.Fragment>
      {wallets && <WalletContainer wallets={wallets} />}
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
