import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useUser } from "../context/UserContext";

const TitleBar = () => {
  const {
    user: { title },
  } = useUser();
  return (
    <Box
      shadow="md"
      m="5px 10px"
      p="10px 20px"
      borderRadius="10px"
      border="1px solid #DDD"
    >
      <Heading size="md">{title}</Heading>
    </Box>
  );
};

export default TitleBar;
