import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const TitleBar = ({ title }) => (
  <Box shadow="md" m="5px 10px" p="10px 20px" borderRadius="10px" border="1px solid #DDD">
    <Heading size="md">{title}</Heading>
  </Box>
);

export default TitleBar;
