import React from "react";
import {
  Heading,
  Button,
  Flex,
  Spacer,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
} from "@chakra-ui/react";

import { useUser } from "../context/UserContext";

const Wallet = ({ wallet }) => {
  const { name, balance } = wallet;

  return (
    <HStack>
      <Heading size="sm">{name}</Heading>
      <Heading size="sm">Balance:</Heading>
      <Heading size="sm">${balance}</Heading>
    </HStack>
  );
};

export default function WalletContainer({ wallets }) {
  const { dispatch } = useUser();

  return (
    <Accordion allowMultiple>
      {wallets.map((wallet) => (
        <AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Wallet key={wallet._id} wallet={wallet} />
            </AccordionButton>
            <AccordionPanel>{wallet.description}</AccordionPanel>
          </AccordionItem>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
