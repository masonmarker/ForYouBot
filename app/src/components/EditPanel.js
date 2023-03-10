/**
 * Side menu panel, capable of being placed
 * on any side of the screen
 *
 * author :
 *  Mason Marker
 */

// React
import React from "react";

// styled components
import styled from "styled-components";

// Chakra components
import {
  Text,
  VStack,
  Button,
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
`;

// 
const EditPanel = ({
  constraints,
  setConstraints
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const finalRef = React.useRef(null);

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
            <Text>Constraints</Text>
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
