import React from "react";
import { Button } from "@chakra-ui/react";

export const CustomButton = ({ primary, title }) => {
  return <Button variant={"solid"}>{title}</Button>;
};
