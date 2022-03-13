import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ text, variant, type, isLoading }) => {
  return (
    <ChakraButton isLoading={isLoading} type={type} variant={variant}>
      {text}
    </ChakraButton>
  );
};

export default Button;
