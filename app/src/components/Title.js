/**
 * Title component at the bottom of the screen.
 * if no conversation has been loaded, it will display
 * the most recent conversation initiated.
 *
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// components
import Convos from "./Convos";
import Login from "./Login";

// toast
import Toast from "./Toast";

// generating a new conversation
import { emptyConversation } from "../messages/messages";

// SidePanel
import EditPanel from "./EditPanel";

// Settings Panel
import SettingsPanel from "./SettingsPanel";

// React
import { useEffect, useState } from "react";

// Chakra components
import {
  Box,
  useColorMode,
  Text,
  Button,
  HStack,
  Spinner,
  Fade,
  ScaleFade,

  // modal for changing conversation
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

// Chakra more icon
import {
  ViewIcon,
  MoonIcon,
  SunIcon,
  AddIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";

// styled components
import styled from "styled-components";

// common
import { colors, css } from "../common/common";

// intersection observer
import { useInView } from "react-intersection-observer";

// styled Title
// centered horizontally
const TitleStyled = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 100%;
  transition: ${css.transition};
  user-select: none;

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    right: 0.8rem;
    gap: 8px;
  }

  .color {
    position: fixed;
    left: 0.8rem;
  }

  .clear-conversation {
    position: fixed;
    left: 4.8rem;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.backgroundColorHover};
  }
`;

// Title component
const Title = ({ app }) => {
  // grab current color mode
  const { colorMode, toggleColorMode } = useColorMode();

  // hover state
  const [hover, setHover] = useState(false);

  // modal for changing conversation
  const { isOpen, onOpen, onClose } = useDisclosure();

  // toast for clearing conversation
  const clearToast = useToast();

  // intersection observer
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // are you sure for clearing all conversations modal useDisclosure
  const {
    isOpen: clearAreYouSure,
    onOpen: clearAreYouSureOpen,
    onClose: clearAreYouSureClose,
  } = useDisclosure();

  // clears the current conversation
  const clearConversation = () => {
    app.conversations[0].name = "New Conversation";
    app.conversations[0].importantIndices = new Set();
    app.setConversations(app.conversations);
    app.setUserMessages([]);
    app.setBotMessages([]);
  };

  // keep conversations updated
  useEffect(() => {
    var displayingConversations = app.conversations;
    displayingConversations[0].user = app.userMessages;
    displayingConversations[0].bot = app.botMessages;
    app.setConversations(displayingConversations);
  }, [
    app.userMessages,
    app.botMessages,
    app.conversations,
    app.setConversations,
  ]);

  // clear all conversations state
  const [clearAll, setClearAll] = useState(false);

  // function to remove a conversation
  function clearAllConversations() {
    app.setConversations([emptyConversation([], [])]);
    app.setUserMessages([]);
    app.setBotMessages([]);
  }

  return (
    <TitleStyled
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      // on click, open modal for changing conversation
      onClick={onOpen}
      // backgroundColor={
      //   colorMode === "light" ? colors.purple : colors.lighterPurple
      // }
      // backgroundColorHover={
      //   colorMode === "light" ? colors.lightPurple : colors.purple
      // }
      //  colorScheme={app.settings.accent}
      h="60px"
    >
      {/* color button */}
      <ColorButton app={app} />
      {app.userMessages.length > 0 && !app.waiting && (
        <Button
          colorScheme={app.settings.accent}
          className="clear-conversation"
          onClick={(e) => {
            clearAreYouSureOpen();
            e.stopPropagation();
          }}
        >
          Clear Conversation
        </Button>
      )}

      {/* clearAreYouSure modal */}
      <Modal isOpen={clearAreYouSure} onClose={clearAreYouSureClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily={app.settings.font}>
            Are you sure?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily={app.settings.font}>
            This will clear this conversation and cannot be undone.
          </ModalBody>

          <ModalFooter fontFamily={app.settings.font}>
            <Button
              colorScheme={app.settings.accent}
              mr={3}
              onClick={clearAreYouSureClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme={app.settings.accent}
              onClick={(e) => {
                // copy of userMessages before clearing
                const userMessagesCopy = app.userMessages;
                // clear all conversations
                clearConversation();

                // toast for clearing conversation
                if (userMessagesCopy.length > 0) {
                  clearToast({
                    render: () => (
                      <Toast app={app} text="Conversation Cleared" />
                    ),
                    duration: 1500,
                  });
                }
                clearAreYouSureClose();
              }}
            >
              Clear Conversation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack fontFamily={app.settings.font}>
        <Text
          color={colorMode === "light" ? "black" : "white"}
          id="current-convo"
          fontFamily={app.settings.font}
        >
          {app.conversations[0]
            ? app.conversations[0].name
            : "New Conversation"}
        </Text>
        {hover && (
          <ViewIcon color={colorMode === "light" ? "black" : "white"} />
        )}
        {app.generating && (
          <Fade in={app.generating}>
            <Spinner thickness="4px" />
          </Fade>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack gap="0.5rem" fontFamily={app.settings.font}>
              <Text userSelect="none">Conversations</Text>

              {/* Adding a conversation */}
              <Button
                colorScheme={app.settings.accent}
                size="sm"
                onClick={() => {
                  app.setConversations([
                    ...app.conversations,
                    emptyConversation([], []),
                  ]);
                }}
              >
                <AddIcon />
              </Button>

              {/* Clearing all conversations */}
              {app.conversations?.length > 1 && (
                <>
                  <ScaleFade in={1}>
                    <Button
                      colorScheme={app.settings.accent}
                      size="sm"
                      onClick={() => {
                        // set clear all state to true
                        setClearAll(true);
                      }}
                      fontFamily={app.settings.font}
                    >
                      Clear All
                    </Button>
                  </ScaleFade>
                  {clearAll && (
                    <ScaleFade in={1}>
                      <HStack>
                        <Button
                          size="xs"
                          onClick={() => {
                            // clear all conversations
                            clearAllConversations();
                            // set clear all state to false
                            setClearAll(false);

                            // close modal
                            onClose();

                            // toast for clearing all conversations
                            clearToast({
                              render: () => (
                                <Toast
                                  app={app}
                                  text="All Conversations Cleared"
                                />
                              ),
                              duration: 1500,
                            });
                          }}
                        >
                          <CheckIcon />
                        </Button>
                        <Button
                          size="xs"
                          onClick={() => {
                            // set clear all state to false
                            setClearAll(false);
                          }}
                        >
                          <CloseIcon />
                        </Button>
                      </HStack>
                    </ScaleFade>
                  )}
                </>
              )}
            </HStack>
          </ModalHeader>

          <ModalBody fontFamily={app.settings.font} pb={6}>
            <Convos app={app} onClose1={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box className="buttons">
        <EditPanel app={app} />
        <Login app={app} />
        <SettingsPanel app={app} />
      </Box>
    </TitleStyled>
  );
};

// button to change the color mode of the application
const ColorButton = ({ app }) => {
  // use Chakra color mode
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      className="color"
      colorScheme={app.settings.accent}
      onClick={(e) => {
        toggleColorMode();

        e.stopPropagation();
      }}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export { ColorButton };
export default Title;