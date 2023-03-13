/**
 * Side menu panel, capable of being placed
 * on any side of the screen
 *
 * author :
 *  Mason Marker
 */

// React
import { useRef } from "react";

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
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

// Chakra Chevron icon
import { ChevronDownIcon } from "@chakra-ui/icons";

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

// Edit Bot modal
const EditPanel = ({ app }) => {
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

            {/* Selecting OpenAI model */}
            <VStack gap="1rem">
              <VStack>
                <Text fontWeight="bold">Active Model</Text>
                <Text fontSize="4rem" fontWeight="light">
                  {app.model}
                </Text>

                <HStack>
                  {/* Display attributes according to the current model */}
                  {app.models[app.model].attributes.map((attribute, i) => {
                    return (
                      <ModelAttribute
                        key={`attribute-${attribute}-${i}`} 
                        title={attribute[0]}
                        color={attribute[1]}
                      />
                    );
                  })}
                </HStack>
              </VStack>
              {/* Selecting model */}
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Select Model
                </MenuButton>
                <MenuList>
                  {/* map models to MenuItem */}
                  {Object.keys(app.models).map((model, i) => {
                    return (
                      <MenuItem
                        key={`model-${model}`}
                        onClick={() => {
                          app.setModel(model);
                        }}
                      >
                        {app.models[model].name}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </VStack>

            <Divider marginBottom="1rem" marginTop="1rem" />
            <Text fontWeight="bold">Constraints</Text>
            <VStack align="left">
              <Checkbox colorScheme="purple">Show work</Checkbox>
              <Checkbox colorScheme="purple">Answer only</Checkbox>
            </VStack>
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

// model attribute
const ModelAttribute = ({ title, color }) => {
  return (
    <Button colorScheme={color} cursor="default" size="xs">
      {title}
    </Button>
  );
};

export default EditPanel;