import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const TitleContainer = ({ username, title }) => (
  <Box bg="teal">
    {username && <Heading>Bienvenid@, {username}!</Heading>}
    {title && <Heading>{title}</Heading>}
    {!username && !title && <Heading>Cargando...</Heading>}
  </Box>
);

export default TitleContainer;
