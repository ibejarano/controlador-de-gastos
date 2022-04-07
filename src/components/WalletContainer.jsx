import React from "react";
import {
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  HStack,
} from "@chakra-ui/react";

import ExpensesTable from "./ExpensesTable";

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
        <AccordionItem
          key={wallet._id}
          shadow="md"
          m="10px 10px"
          borderRadius="20px"
        >
          <AccordionItem>
            <AccordionButton borderRadius="20px">
              <Wallet wallet={wallet} />
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
