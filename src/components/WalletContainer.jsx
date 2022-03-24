import React from "react";
import {
  Heading,
  Button,
  Flex,
  Spacer,
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";

import { useUser } from "../context/UserContext";

export default function WalletContainer({ wallet }) {
  const { dispatch } = useUser();

  const openWallet = async (walletId) => {
    dispatch({
      type: "open-wallet",
      payload: { name: wallet.name, id: walletId },
    });
  };

  const { _id, name, description, balance } = wallet;

  return (
    <Flex maxW="800px" border="1px solid black" p="4">
      <Box>
        <Heading size="md">{name}</Heading>
        <Text size="sm">{description}</Text>
      </Box>
      <Spacer />
      <Box minW="100px">
        <Heading size="md">Balance:</Heading>
        <Heading size="md">${balance}</Heading>
      </Box>
      <Spacer />
      <Button onClick={() => openWallet(_id)}>Ver detalles</Button>
      <Button>Opciones*</Button>
    </Flex>
  );
}
