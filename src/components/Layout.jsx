import React from "react";
import { Box, Container } from "@chakra-ui/react";

import TitleBar from "./TitleBar";
import Navbar from "./Navbar";

const MainContainer = ({ children }) => (
  <Container p="0px">
    <TitleBar />
    <Box p="12px">{children}</Box>
    <Navbar />
  </Container>
);

export default MainContainer;
