/**
 * Modal for creating an account
 *
 * author :
 *  Mason Marker
 */

// Chakra components
import {
  Box,
  Link,
  Button,
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
const CreateAccount = ({closeLoginModal, app}) => {
  // handle modal disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Link fontSize="sm" onClick={onOpen}>Don't have an account?</Link>
      <Modal isLazy isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Modal body</p>
          </ModalBody>
          <ModalFooter>
            <Button 
                colorScheme={app.settings.accent}
                mr={3}
                onClick={() => {
                    closeLoginModal();
                    onClose();
                }}
            >
                Create account
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateAccount;
