import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center h="95vh">
      <Spinner thickness="4px" size="xl" />
    </Center>
  );
}
