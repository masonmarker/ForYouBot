/**
 * Login button and modal
 *
 * author :
 *  Mason Marker
 */

// react usestate
import { useState } from "react";

// components
import CreateAccount from "./CreateAccount";

// styled components
import styled from "styled-components";

// Chakra components
import {
  Button,
  Text,
  Link,
  Input,
  VStack,
  // modal
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// styled Login
const StyledLogin = styled.div``;

// Login component
const Login = ({ app }) => {
  // Login modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <StyledLogin>
      <Button
        onClick={(e) => {
          onOpen();
          e.stopPropagation();
        }}
      >
        Login
      </Button>

      <Modal isLazy isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login or create account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Email" />
              <Input placeholder="Password" />
              <CreateAccount closeLoginModal={onClose} app={app} />
              <Link fontSize="sm">Forgot password?</Link>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={app.settings.accent} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost">Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </StyledLogin>
  );
};

export default Login;
