import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const TitleAndSubtitle = ({ title, subtitle, invert }) => (
  <Box >
    <Heading>{title}</Heading>
    <Heading>{subtitle}</Heading>
  </Box>
);

export default TitleAndSubtitle;