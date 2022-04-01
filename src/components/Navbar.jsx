import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoneyCheckAlt,
  faTools,
  faInfoCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const sections = [
  {
    name: "Inicio",
    url: "/wallets",
    icon: faHome,
  },
  {
    name: "Presupuestos",
    url: "/budgets",
    icon: faMoneyCheckAlt,
  },
  {
    name: "Configurar",
    url: "/config",
    icon: faTools,
  },
  {
    name: "Info",
    url: "/info",
    icon: faInfoCircle,
  },
  {
    name: "Logout",
    url: "/logout",
    icon: faSignOutAlt,
  },
];

const NavItem = ({ section }) => (
  <Link to={section.url}>
    <FontAwesomeIcon size="2xl" icon={section.icon} />
  </Link>
);

const Navbar = () => (
  <Box position="fixed" bottom="0vh" width="100vw" p="10px">
    <Flex justifyContent={"space-around"}>
      {sections.map((sec) => (
        <NavItem key={sec.name} section={sec} />
      ))}
    </Flex>
  </Box>
);

export default Navbar;
