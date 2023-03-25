/**
 * Bot actions for coding
 *
 * author:
 *  Mason Marker
 *  Harris Chaudhry
 */

// components
import ActionModal from "./ActionModal";

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
        size="xs"
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
    <ActionModal
      isOpen={isOpen}
      onClose={onClose}
      thisMessage={thisMessage}
      header="Coding"
      desc="Make quicker and more concise requests regarding a program."
    >

    </ActionModal>

  );
};

// export Coding Actions
export default CodingActions;
