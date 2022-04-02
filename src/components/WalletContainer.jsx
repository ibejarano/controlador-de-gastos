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

import ExpensesTable from "./ExpensesTable"

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
            <AccordionPanel>
              <Text>{wallet.description}</Text>
              <ExpensesTable expenses={wallet.expenses} />
            </AccordionPanel>
          </AccordionItem>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
