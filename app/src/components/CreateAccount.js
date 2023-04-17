/**
 * Modal for creating an account
 *
 * author :
 *  Mason Marker
 */

// Tooltip
import Tooltip from "./Tooltip";

// Chakra components
import {
  Box,
  Link,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Divider,

  // modal
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// CreateAccount component
const CreateAccount = ({ closeLoginModal, app }) => {
  // handle modal disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Link fontSize="sm" onClick={onOpen}>
        Don't have an account?
      </Link>
      <Modal isLazy isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="left">
              <VStack align="left">
                <Text>Email</Text>
                <Input placeholder="Email" />
              </VStack>

              <VStack align="left">
                <Text>Password</Text>
                <Input placeholder="Password" type="password" />
              </VStack>

              <VStack align="left">
                <Text>Confirm Password</Text>
                <Input placeholder="Confirm password" type="password" />
              </VStack>

              <Divider p={2} />
              <Box pt={2}>
                <HStack mb={2}>
                  <Text>
                    OpenAI API key (<b>required</b>)
                  </Text>

                  <Tooltip
                    app={app}
                    body={
                      <VStack fontSize="sm">
                        <Text>
                          Your OpenAI API key is used to connect with OpenAI's
                          ChatGPT models.
                        </Text>
                      </VStack>
                    }
                  />
                </HStack>

                <Input placeholder="OpenAI API key" />
              </Box>

              <Text fontSize="sm">
                By creating an account, you agree to our{" "}
                <Link fontWeight="bold">Terms of Service</Link> and{" "}
                <Link fontWeight="bold">Privacy Policy</Link>.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} colorScheme={app.settings.accent}>
              Cancel
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                closeLoginModal();
                onClose();
              }}
            >
              Create account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateAccount;
