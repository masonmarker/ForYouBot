/**
 * Settings Panel, includes both the button and the Drawer.
 *
 * author :
 *  Mason Marker
 */

// React
import { useRef, useState } from "react";

// common fonts
import { fonts } from "./../common/common";

// ColorButton from Title
import { ColorButton } from "./Title";

// pricing functions
import { tokensForString } from "./Prompt";
import { priceForTokens } from "../models/models";

// syntax highliter  (for code mode)
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Chakra components
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Icon,
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

  // Popover
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Tooltip,

  // import grid
  Grid as ChakraGrid,
  GridItem as ChakraGridItem,
} from "@chakra-ui/react";

// Chakra checkicon
import {
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  InfoIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons";

// styled components
import styled from "styled-components";
import { colors } from "./../common/common";

// styled SettingsPanel
const SettingsPanelStyled = styled.div``;

// SettingsPanel component
const SettingsPanel = ({ app }) => {
  // modal ref
  const finalRef = useRef(null);

  // drawer state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // language index state
  const [languageIndex, setLanguageIndex] = useState(0);

  // code dropdown state useDisclosure
  const {
    isOpen: isOpenDropdown,
    onOpen: onOpenDropdown,
    onClose: onCloseDropdown,
  } = useDisclosure();

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

  // customize interface state
  const {
    isOpen: isOpenCustomizeInterface,
    onOpen: onOpenCustomizeInterface,
    onClose: onCloseCustomizeInterface,
  } = useDisclosure();

  // customize interface font state
  const {
    isOpen: isOpenCustomizeInterfaceFont,
    onOpen: onOpenCustomizeInterfaceFont,
    onClose: onCloseCustomizeInterfaceFont,
  } = useDisclosure();

  // customize interface chat icons state
  const {
    isOpen: isOpenCustomizeInterfaceChatIcons,
    onOpen: onOpenCustomizeInterfaceChatIcons,
    onClose: onCloseCustomizeInterfaceChatIcons,
  } = useDisclosure();

  return (
    <SettingsPanelStyled>
      <Button
        className="button"
        colorScheme={app.settings.accent}
        onClick={(e) => {
          onOpen();
          e.stopPropagation();
        }}
      >
        Settings
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isLazy>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily={app.settings.font}>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider mb={3} />

            {/* Button for computing pricing */}
            <VStack fontFamily={app.settings.font}>
              <Text>
                Compute pricing for a certain amount of words / tokens given to
                and receieved by an AI model.
              </Text>
              <Button onClick={onOpenComputePricing}>Compute Pricing</Button>
            </VStack>
            <Divider mt={3} mb={3} />
            <VStack fontFamily={app.settings.font}>
              <Menu>
                <Text>Change the interface to your preferences</Text>
                <MenuButton as={Button}>Customize Interface</MenuButton>
                <MenuList>
                  <MenuItem onClick={onOpenCustomizeInterface}>
                    Interface Color
                  </MenuItem>
                  <MenuItem onClick={onOpenCustomizeInterfaceFont}>
                    Interface Font
                  </MenuItem>
                  <MenuItem onClick={onOpenCustomizeInterfaceChatIcons}>
                    Chat Icons
                  </MenuItem>
                </MenuList>
              </Menu>
            </VStack>
            <Divider mt={3} mb={3} />
            {/* Changing preferred paragraph size */}
            <VStack fontFamily={app.settings.font}>
              <Text>Preferred paragraph size</Text>
              <HStack>
                <Input
                  defaultValue={app.settings.paragraphSize?.toString()}
                  w={20}
                  onChange={(e) => {
                    // setParagraphSize to the integer value of the input
                    app.settings.setParagraphSize(parseInt(e.target.value));
                  }}
                />
                <Text>sentences</Text>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <VStack>
              <Text fontSize="xs">Changes save automatically</Text>
              <HStack>
                <Button
                  colorScheme={app.settings.accent}
                  mr={3}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button variant="ghost" onClick={onOpenHelp}>
                  Help
                </Button>
              </HStack>
            </VStack>

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
            {/* Customize interface modal */}
            <Modal
              isOpen={isOpenCustomizeInterface}
              onClose={onCloseCustomizeInterface}
            >
              <ModalOverlay />
              <ModalContent mt={150}>
                <ModalHeader>Customize Interface</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack>
                    <Button colorScheme={app.settings.accent}>
                      Interface Color
                    </Button>
                    <ChakraGrid
                      templateColumns="repeat(3, 1fr)"
                      templateRows="repeat(3, 1fr)"
                      gap={2}
                    >
                      {[
                        "purple",
                        "green",
                        "blue",
                        "red",
                        "yellow",
                        "pink",
                        "cyan",
                        "teal",
                        "orange",
                      ].map((color, i) => {
                        return (
                          <ChakraGridItem key={`color-id-${i}`}>
                            <Button
                              colorScheme={color}
                              onClick={() => {
                                app.settings.setAccent(color);
                              }}
                            ></Button>
                          </ChakraGridItem>
                        );
                      })}
                    </ChakraGrid>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <ColorButton app={app} />
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* Customize interface font modal */}
            <Modal
              isOpen={isOpenCustomizeInterfaceFont}
              onClose={onCloseCustomizeInterfaceFont}
            >
              <ModalOverlay />
              <ModalContent mt={200}>
                <ModalCloseButton />
                <ModalBody>
                  <VStack fontFamily={app.settings.font}>
                    <Button colorScheme={app.settings.accent} mt={5} mb={5}>
                      Interface Font
                    </Button>
                    <ChakraGrid
                      templateColumns="repeat(3, 1fr)"
                      templateRows="repeat(3, 1fr)"
                      gap={4}
                    >
                      {fonts.all.map((font, i) => {
                        return (
                          <ChakraGridItem key={`font-id-${i}`}>
                            <Button
                              fontFamily={font}
                              onClick={() => {
                                app.settings.setFont(font);
                              }}
                            >
                              {font !== fonts.main ? font : "default"}
                            </Button>
                          </ChakraGridItem>
                        );
                      })}
                    </ChakraGrid>
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>

            {/* customize interface chat icons */}
            <Modal
              isOpen={isOpenCustomizeInterfaceChatIcons}
              onClose={onCloseCustomizeInterfaceChatIcons}
            >
              <ModalOverlay />
              <ModalContent mt={200}>
                <ModalCloseButton />
                <ModalHeader fontFamily={app.settings.font}>
                  Chat Icons
                </ModalHeader>
                <ModalBody fontFamily={app.settings.font}>
                  {/* center the 2 sections in the modal body */}
                  <VStack>
                    {/* 2 sections for user icon and user icon picking */}
                    <HStack gap={4} mb={5}>
                      {/* user icon section */}
                      <VStack>
                        <Text>User Icon</Text>
                        {/* current user icon */}
                        <Button colorScheme={app.settings.accent}>
                          {app.settings.icons.userIcon}
                        </Button>
                        {/* ChakraGrid for possible user icons */}
                        <ChakraGrid
                          templateColumns="repeat(3, 1fr)"
                          templateRows="repeat(2, 1fr)"
                          gap={2}
                        >
                          {app.settings.icons.userIcons.map((icon, i) => {
                            return (
                              <ChakraGridItem key={`user-icon-id-${i}`}>
                                <Button
                                  onClick={() => {
                                    app.settings.icons.setUserIcon(icon);
                                  }}
                                >
                                  {/* the icon should be displayed with no margins */}
                                  {icon}
                                </Button>
                              </ChakraGridItem>
                            );
                          })}
                        </ChakraGrid>
                      </VStack>

                      {/* user icon picker section */}
                      <VStack>
                        <Text>Bot Icon</Text>
                        {/* current bot icon */}
                        <Button colorScheme={app.settings.accent}>
                          {app.settings.icons.botIcon}
                        </Button>
                        {/* ChakraGrid for possible bot icons */}
                        <ChakraGrid
                          templateColumns="repeat(3, 1fr)"
                          templateRows="repeat(2, 1fr)"
                          gap={2}
                        >
                          {app.settings.icons.botIcons.map((icon, i) => {
                            return (
                              <ChakraGridItem key={`bot-icon-id-${i}`}>
                                <Button
                                  onClick={() => {
                                    app.settings.icons.setBotIcon(icon);
                                  }}
                                >
                                  {icon}
                                </Button>
                              </ChakraGridItem>
                            );
                          })}
                        </ChakraGrid>
                      </VStack>
                    </HStack>
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>
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

  // reference for tokens for string input
  const tfsRef = useRef(null);

  // reference for price for tokens input
  const pftRef = useRef(null);

  // state for selected model
  const [selectedModel, setSelectedModel] = useState("davinci");

  // async function to compute tokens for string
  async function computeTokensForString() {
    setTfs(await tokensForString(tfsRef.current.value));
  }

  // async function to compute price for tokens
  function computePriceForTokens() {
    // set price state
    setPft(
      Math.round(
        priceForTokens(parseInt(pftRef.current.value), selectedModel) * 1000000
      ) / 1000000
    );
  }

  return (
    <VStack>
      {/* Dropdown to choose model */}
      <VStack>
        <Text>Selected model: {selectedModel}</Text>
        <Box>
          <Menu>
            <MenuButton as={Button}>Choose a model</MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setSelectedModel("davinci");
                }}
              >
                davinci
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedModel("curie");
                }}
              >
                curie
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedModel("babbage");
                }}
              >
                babbage
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedModel("ada");
                }}
              >
                ada
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </VStack>

      <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
        {/* Section for converting a string to tokens */}
        <GridItem>
          <VStack>
            <Text>Convert a string to tokens</Text>
            <HStack>
              <Input
                ref={tfsRef}
                placeholder="Enter a string"
                onKeyPress={async (e) => {
                  if (e.key === "Enter") {
                    await computeTokensForString();
                  }
                }}
              />
              <Button onClick={async () => await computeTokensForString()}>
                Convert
              </Button>
            </HStack>
            <Text>Number of tokens: {tfs}</Text>
          </VStack>
        </GridItem>

        {/* Section for converting tokens to price */}
        <GridItem>
          <VStack>
            <Text>Convert tokens to price</Text>
            <HStack>
              <Input
                ref={pftRef}
                placeholder="Enter a number of tokens"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    computePriceForTokens();
                  }
                }}
              />
              <Button onClick={computePriceForTokens}>Convert</Button>
            </HStack>
            <Text>Price: ${pft}</Text>
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default SettingsPanel;
