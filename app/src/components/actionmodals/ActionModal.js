/**
 * Modal for a category of actions
 *
 * author :
 *  Mason Marker
 *  Harris Chaudhry
 */

// Chakra components
import {
  useColorMode,
  Box,
  useToast,
  Button,
  VStack,
  HStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

// ActionModal
const ActionModal = ({
  isOpen,
  onClose,
  thisMessage,
  header,
  desc,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily={thisMessage.app.settings.font}>
          {header}
        </ModalHeader>
        <ModalBody fontFamily={thisMessage.app.settings.font}>
          <Text>{desc}</Text>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={thisMessage.app.settings.accent}
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActionModal;
