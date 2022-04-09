import React, { useState } from "react";
import {
  VStack,
  Flex,
  Input,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
} from "@chakra-ui/react";

import { changeWalletName, deleteWallet } from "../helpers/requests";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

export default function ManageWallets() {
  const {
    user: { wallets },
  } = useUser();
  const [currentWallet, setCurrentWallet] = useState({});

  const handleChange = (e) => {
    e.persist();
    setCurrentWallet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeWallet = async () => {
    const { _id, name, description } = currentWallet;
    const { err } = await changeWalletName(_id, { name, description });
    if (err) {
      toast.error("Algo salio mal...");
    } else {
      toast.success("Datos cambiados satisfactoriamente");
    }
    onClose();
  };

  const handleDeleteWallet = async ({ name, _id }) => {
    if (window.confirm(`Eliminar billetera ${name}?`)) {
      const { err } = await deleteWallet(_id);
      if (err) {
        toast.error("Algo salio mal...");
      } else {
        toast.success("Billetera eliminada");
      }
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { name, description } = currentWallet;

  return (
    <React.Fragment>
      {wallets && (
        <VStack p="20px">
          {wallets.map(({ description, name, _id }) => (
            <Flex key={_id} justifyContent="space-between" w="100%">
              <Heading size="md">{name}</Heading>
              <HStack>
                <Button
                  onClick={() => {
                    setCurrentWallet({ name, description, _id });
                    onOpen();
                  }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    handleDeleteWallet({ name, _id });
                  }}
                >
                  Eliminar
                </Button>
              </HStack>
            </Flex>
          ))}
        </VStack>
      )}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cambiar nombre y/o descripcion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              fontWeight="bold"
              mb="1rem"
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
            />
            <Input
              fontWeight="bold"
              mb="1rem"
              name="description"
              type="text"
              value={description}
              onChange={handleChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleChangeWallet}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}
