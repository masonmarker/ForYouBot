/**
 * Settings Panel, includes both the button and the Drawer.
 *
 * author :
 *  Mason Marker
 */

// React
import { useRef, useState } from "react";

// pricing
import {
  tokensForString,
  priceForTokens
} from "../pricing/pricing";

// Chakra components
import {
  Text,
  VStack,
  Button,
  Input,

  // grid components
  Grid,
  GridItem,

  // Drawer
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,

  // Modal
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,

  // Dropdown
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,


  Divider,
} from "@chakra-ui/react";

// styled components
import styled from "styled-components";

// styled SettingsPanel
const SettingsPanelStyled = styled.div``;

// SettingsPanel component
const SettingsPanel = () => {
  // modal ref
  const finalRef = useRef(null);

  // drawer state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // help drawer state
  const {
    isOpen: isOpenHelp,
    onOpen: onOpenHelp,
    onClose: onCloseHelp,
  } = useDisclosure();

  // compute pricing Drawer state
  const {
    isOpen: isOpenComputePricing,
    onOpen: onOpenComputePricing,
    onClose: onCloseComputePricing,
  } = useDisclosure();

  return (
    <SettingsPanelStyled>
      <Button
        className="button"
        colorScheme="purple"
        onClick={(e) => {
          onOpen();
          e.stopPropagation();
        }}
      >
        Settings
      </Button>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />

            {/* Button for computing pricing */}
            <VStack>
              <Text>
                Compute pricing for
                a certain amount of
                words / tokens given to and receieved
                by an AI model.
              </Text>
              <Button onClick={onOpenComputePricing}>
                Compute Pricing
              </Button>
            </VStack>
            <Divider />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onOpenHelp}>
              Help
            </Button>


            {/* Help drawer */}
            <Drawer
              isOpen={isOpenHelp}
              placement="bottom"
              onClose={onCloseHelp}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Help</DrawerHeader>
                <DrawerBody>
                  <Text>Help goes here</Text>
                </DrawerBody>
                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>

            {/* Compute pricing drawer */}
            <Drawer
              isOpen={isOpenComputePricing}
              placement="bottom"
              onClose={onCloseComputePricing}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Compute Pricing</DrawerHeader>
                <DrawerBody>
                  <ComputePricing />
                </DrawerBody>
                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SettingsPanelStyled>
  );
};


// computing pricing component
// contains a dropdown for a specific OpenAI model
// includes a state for the selected model  
// includes an Input for the number of words / tokens
// includes a button to compute the price
// includes a text box to display the price

const ComputePricing = () => {

  // tokens for string state
  const [tfs, setTfs] = useState(0);

  // price for tokens state
  const [pft, setPft] = useState(0);


  // state for selected model
  const [selectedModel, setSelectedModel] = useState("davinci");

  return (
    <VStack
    // center all elements horizontally and vertically
    >

      {/* Dropdown to choose model */}
      <VStack>
        <Text>Selected model: {selectedModel}</Text>
        <Menu>
          <MenuButton as={Button}>Choose a model</MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setSelectedModel("davinci");
              }}
            >davinci</MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedModel("curie");
              }}
            >curie</MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedModel("babbage");
              }}
            >babbage</MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedModel("ada");
              }}
            >ada</MenuItem>
          </MenuList>
        </Menu>

      </VStack>



      <Grid
        templateColumns="repeat(2, 1fr)"
      >

        {/* Section for converting a string to tokens */}
        <GridItem>
          <VStack>
            <Text>Convert a string to tokens</Text>
            <Input
              placeholder="Enter a string"
              onChange={(e) => {
                setTfs(tokensForString(e.target.value));
              }}
            />
            <Text>Number of tokens: {tfs}</Text>
          </VStack>
        </GridItem>


                



      </Grid>


    </VStack>
  )
}

export default SettingsPanel;
