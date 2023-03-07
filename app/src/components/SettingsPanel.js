/**
 * Settings Panel, includes both the button and the Drawer.
 *
 * author :
 *  Mason Marker
 */

// React
import { useRef, useState } from "react";

// pricing
import { tokensForWords, wordsForTokens } from "../pricing/pricing";

// Chakra components
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Input,


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

  // words for tokens state
  const [wft, setWordsForTokens] = useState(0);

  // tokens for words state
  const [tfw, setTokensForWords] = useState(0);

  return (
    <VStack>
      
      {/* Section for converting tokens to words */}
      <HStack>
        <Text>Convert tokens to words</Text>
        <Input 
          placeholder="Enter number of tokens" 
          onChange={(e) => {
            setWordsForTokens(tokensForWords(e.target.value));  
          }}
        />
        <Text>tokens = {wft} words</Text>
      </HStack>


      {/* Section for converting words to tokens */}
      <HStack>
        <Text>Convert words to tokens</Text>
        <Input
          placeholder="Enter number of words"
          onChange={(e) => {
            setTokensForWords(wordsForTokens(e.target.value));

            // numbers in the input field should
            // have the following format:
            // 1,000,000
            // 1,000,000.00
            // 1,000,000.000

            e.target.value = e.target.value.replace(/,/g, "");
          }}
        />
        <Text>words = {tfw} tokens</Text>
      </HStack>


    </VStack>
  )
}

export default SettingsPanel;
