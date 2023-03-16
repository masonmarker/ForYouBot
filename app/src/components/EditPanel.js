/**
 * Side menu panel, capable of being placed
 * on any side of the screen
 *
 * author :
 *  Mason Marker
 */

// React
import { useRef } from "react";

// import message
import Message from "./Message";

// styled components
import styled from "styled-components";

// import skeleton loading

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
  useColorMode,

  // Slider
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

// Chakra Chevron icon
import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// atom dark and lightOne
import {
  atomDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

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

  // color mode Chakra
  const { colorMode } = useColorMode();

  // modal reference
  const finalRef = useRef(null);

  return (
    <SidePanelStyled>
      <Button
        className="button"
        colorScheme={app.settings.accent}
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
          <ModalHeader fontFamily={app.settings.font}>Edit Bot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider marginBottom="1rem" />

            {/* Selecting OpenAI model */}
            <VStack gap="1rem">
              <VStack fontFamily={app.settings.font}>
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
                        // verify attribute is not undefined
                        title={attribute[0]}
                        color={attribute[1]}
                        font={app.settings.font}
                      />
                    );
                  })}
                </HStack>
              </VStack>
              {/* Selecting model */}
              <Menu fontFamily={app.settings.font}>
                <MenuButton
                  fontFamily={app.settings.font}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  Select Model
                </MenuButton>
                <MenuList>
                  {/* map models to MenuItem */}
                  {Object.keys(app.models).map((model, i) => {
                    return (
                      <MenuItem
                        fontFamily={app.settings.font}
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

              <Divider marginBottom="1rem" marginTop="1rem" />

              {/* Setting model specifics */}
              <Text size="lg" fontWeight="bold">
                Adjust Model
              </Text>

              {/* Slider for temperature */}
              <AdjustSlider
                app={app}
                title="Temperature"
                sub1="predictable"
                sub2="random"
                state={app.temperature}
                setState={app.setTemperature}
              />

              {/* Slider for top p */}
              <AdjustSlider
                app={app}
                title="Top P"
                sub1="lower probability mass"
                sub2="higher probability mass"
                state={app.topP}
                setState={app.setTopP}
              />
            </VStack>

            <Divider marginBottom="1rem" marginTop="4rem" />
            <Text fontWeight="bold" fontFamily={app.settings.font}>
              Constraints
            </Text>
            <VStack fontFamily={app.settings.font} align="left">
              <Checkbox colorScheme={app.settings.accent}>Show work</Checkbox>
              <Checkbox colorScheme={app.settings.accent}>Answer only</Checkbox>
            </VStack>

            {/* Additional options */}
            <Divider marginBottom="1rem" marginTop="4rem" />
            <Text fontWeight="bold" fontFamily={app.settings.font}>
              Additional Options
            </Text>
            <VStack fontFamily={app.settings.font} align="left">
              <CheckOption
                app={app}
                state={app.settings.codeDetection}
                setState={app.settings.setCodeDetection}
              />
            </VStack>
            <Divider marginBottom="1rem" marginTop="4rem" />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={app.settings.accent}
              mr={3}
              onClick={onClose}
              fontFamily={app.settings.font}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SidePanelStyled>
  );
};

// Menu displaying information about the current option
const CheckOption = ({ app, state, setState }) => {
  // color mode Chakra
  const { colorMode } = useColorMode();

  return (
    <HStack fontFamily={app.settings.font}>
      <Checkbox
        colorScheme={app.settings.accent}
        isChecked={state}
        onChange={(e) => {
          setState(e.target.checked);
        }}
      >
        Code Detections
      </Checkbox>
      <Menu>
        <MenuButton as={Button} h={6} minW={6} p={0}>
          <InfoIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <VStack>
              <Text>
                Example style of a message with 'Code Detections' checked:
              </Text>
              <SyntaxHighlighter
                style={colorMode === "light" ? oneLight : atomDark}
                language="java"
                showLineNumbers={true}
                wrapLines={true}
                wrapLongLines={true}
                lineProps={{
                  style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                }}
              >
                System.out.println("Hello, World!");
              </SyntaxHighlighter>
              <Text>
                Java was the detected programming language, therefore, <br/>
                the snippet was provided syntax highlighting.
              </Text>
            </VStack>
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

// slider for adjusting models
const AdjustSlider = ({ app, title, sub1, sub2, state, setState }) => {
  // color mode Chakra
  const { colorMode } = useColorMode();

  return (
    <HStack>
      <Box w="100%">
        <Text>{title}</Text>
        <Slider
          w={300}
          aria-label="slider-ex-6"
          onChange={(val) => setState(val)}
          colorScheme={app.settings.accent}
          value={state}
        >
          <SliderMark fontSize="sm" value={3}>
            {sub1}
          </SliderMark>
          <SliderMark fontSize="sm" value={82}>
            {sub2}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
      {/* Animation  */}
      <Box w="80px" h="50px" fontFamily={app.settings.font} fontWeight="bold">
        <CircularProgressbar
          styles={buildStyles({
            trailColor: colorMode === "light" ? "white" : "black",

            // pathColor should be red but with a log of alpha of app temperature
            pathColor: `rgba(255, 0, 0, ${state / 100})`,

            textColor: colorMode === "light" ? "black" : "white",
            textSize: "23px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.2,

            // circle thickness
            strokeWidth: 10,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          })}
          value={state}
          text={state / 100}
          counterClockwise
        />
      </Box>
    </HStack>
  );
};

// model attribute
const ModelAttribute = ({ title, color, font }) => {
  return (
    <Button fontFamily={font} colorScheme={color} cursor="default" size="xs">
      {title}
    </Button>
  );
};

export default EditPanel;
