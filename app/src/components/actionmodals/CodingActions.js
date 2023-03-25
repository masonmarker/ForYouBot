/**
 * Bot actions for coding
 *
 * author:
 *  Mason Marker
 *  Harris Chaudhry
 */

// import Chakra components
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

// import Chakra icons
import { ChevronRightIcon } from "@chakra-ui/icons";

// programming icon from react icons
import { BiCodeAlt } from "react-icons/bi";

// Coding Actions
const CodingActions = ({ thisMessage }) => {
  // Chakra color mode
  const { colorMode } = useColorMode();

  // Chakra toast
  const toast = useToast();

  // handle modal disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack align="left">
      <Button
        size="sm"
        variant="ghost"
        rightIcon={<ChevronRightIcon />}
        onClick={onOpen}
      >
        <HStack>
          <BiCodeAlt />
          <Text>Coding</Text>
        </HStack>
      </Button>

      {/* modal for text information and actions */}
      <CodingModal
        isOpen={isOpen}
        onClose={onClose}
        thisMessage={thisMessage}
      />
    </VStack>
  );
};

// modal for coding information and actions
const CodingModal = ({ isOpen, onClose, thisMessage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Coding</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="left">
            <Text>
                Make quicker requests regarding a program.
            </Text>
          </VStack>
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

// export Coding Actions
export default CodingActions;
