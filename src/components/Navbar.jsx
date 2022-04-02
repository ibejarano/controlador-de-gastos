import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Link,
  Center,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoneyCheckAlt,
  faTools,
  faInfoCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "../helpers/requests";

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
];

const NavItem = ({ section }) => (
  <Center>
    <Link as={RouterLink} to={section.url}>
      <FontAwesomeIcon size="2xl" icon={section.icon} />
    </Link>
  </Center>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const logoutConfirm = async () => {
    await logout();
    sessionStorage.removeItem("expenses-user");
    window.location = "/";
  };
  return (
    <Box position="fixed" bottom="0vh" width="100vw" p="10px">
      <Flex justifyContent={"space-around"}>
        {sections.map((sec) => (
          <NavItem key={sec.name} section={sec} />
        ))}
        <Button onClick={onOpen} p={0}>
          <FontAwesomeIcon size="2xl" icon={faSignOutAlt} />
        </Button>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Salir
            </AlertDialogHeader>

            <AlertDialogBody>¿Estas seguro que quieres salir?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={logoutConfirm} ml={3}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
