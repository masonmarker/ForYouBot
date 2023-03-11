/**
 * Side menu panel, capable of being placed
 * on any side of the screen
 *
 * author :
 *  Mason Marker
 */

// React
import { useRef } from 'react';

// styled components
import styled from "styled-components";

// Chakra components
import {
  Text,
  Box,
  VStack,
  HStack,
  Button,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox
} from "@chakra-ui/react";

// styled SidePanel
// should be permanently in the bottom right corner
const SidePanelStyled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  /* bottom right corner */
  .button {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1rem;
  }

  /* list items vertically */
  .constraints-1 {
    display: flex;
    flex-direction: column;
  }

`;

// Edit Bot modal
const EditPanel = ({
  constraints,
  setConstraints
}) => {

  // disclosure for displaying the modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // modal reference
  const finalRef = useRef(null);

  return (
    <SidePanelStyled>
      <Button
        className="button"
        colorScheme="purple"
        onClick={(e) => {
          onOpen();
          e.stopPropagation();
        }}
      >
        Edit Bot
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Bot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider marginBottom="1rem" />
            <Text>Constraints</Text>
            <Box className="constraints-1">
              <Checkbox colorScheme="purple">Show work</Checkbox>
              <Checkbox colorScheme="purple">Answer only</Checkbox>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Customize Interface</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SidePanelStyled>
  );
};

export default EditPanel;
