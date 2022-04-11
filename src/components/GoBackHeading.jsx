import React from "react";
import { useHistory } from "react-router-dom";
import { Heading, HStack, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function ConfigPage({ children }) {
  const history = useHistory();

  return (
    <HStack>
      <Button onClick={history.goBack} leftIcon={<ArrowBackIcon />} />
      <Heading size="sm">{children}</Heading>
    </HStack>
  );
}
