/**
 * Message box, shows either a user response request or a message from the bot
 *
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// states
import { useState, useRef, useEffect } from "react";

// actionmodal components
import TextActions from "./actionmodals/TextActions";

// Toast
import Toast from "./Toast";

// Chakra components
import {
  // general
  useColorMode,
  useToast,
  Box,
  Text,
  Stack,
  HStack,
  VStack,
  Button,
  Input,
  Textarea,

  // modal for viewing more information about the message
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,

  // menu
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Divider,

  // radio group for choosing between
  // characters, words, sentences, and lines
  // when summarizing or expanding
  RadioGroup,
  Radio,

  // fading
  ScaleFade,

  // states
  useDisclosure,
  Fade,
} from "@chakra-ui/react";

// syntax highliter  (for code mode)
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

// intersection observer
import { useInView } from "react-intersection-observer";

// Chakra icons
import {
  CopyIcon,
  EditIcon,
  RepeatIcon,
  QuestionOutlineIcon,
  ChevronRightIcon,
  ViewIcon,
  StarIcon,
} from "@chakra-ui/icons";

// BsLightningCharge from react-icons/bs
import { BsLightningCharge } from "react-icons/bs";

// ImFileText2 from react-icons/im
import { ImFileText2 } from "react-icons/im";

// VscDebugContinueSmall from react-icons/vsc
import { VscDebugContinueSmall } from "react-icons/vsc";

// styled components
import styled from "styled-components";

// import common
import { colors, fonts } from "../common/common";

// styled Message
const MessageStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  /*border-top: 1px solid ${(props) => props.borderColor};*/

  /* message box */
  .msg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
  }

  .msg-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  /* message text style, should wrap on overflow*/
  .msg-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .icon-text {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }

  /* message text style, should wrap on overflow*/
  .msg-pre-text {
    font-family: ${(props) => props.fontFamily};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
`;

// Message component
// props : date
//       : from
//       : message
//       : messageID
const Message = (props) => {
  // grab current color mode
  const { colorMode } = useColorMode();

  // state for displaying the copy button
  const [showCopy, setShowCopy] = useState(false);

  // state for switching between the message and a textarea to alter the message
  // and resend
  const [edit] = useState(false);

  // fading
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // useDisclosure for modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // function to resubmit the message
  function handleResubmit() {
    // set the input's value to the message
    props.app.refs.areaRef.current.value = props.message;

    // close the modal
    onClose();
  }

  // is editing toast
  const toast = useToast();

  // function to reach out to /program-language-detector to get the language of the
  // message
  async function getLanguage(message) {
    // get the language of the message
    const response = await fetch(
      "http://localhost:3080/program-language-detector",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          string: message,
        }),
      }
    );

    // get the language
    const { language } = await response.json();

    // language in lowercase
    const lower = language.toLowerCase();

    // turns it to lowercase
    if (lower !== "unknown") {
      console.log(`detected language in message: ${lower}`);
    }

    // return the language
    return lower;
  }

  // state for the language of the message
  const [language, setLanguage] = useState("unknown");

  // set the language state for this message according to getLanguage of props.message
  useEffect(() => {
    // get the language of the message
    getLanguage(props.message).then((language) => {
      // set the language state
      setLanguage(language);
    });
  }, []);

  // state for message expansion or summarization
  const [actionLimit, setActionLimit] = useState("characters");

  // state for action limit value
  const [actionLimitValue, setActionLimitValue] = useState(100);

  // state for action or more or or less value
  const [orActionLimit, setOrActionLimit] = useState("less");

  // ref for important label
  const importantRef = useRef();

  // function to determine if this message has been remembered
  // by the bot or not
  // message is remembered if its index is 0, or between
  // app.userMessages.length - app.prevMessageCount and app.userMessages.length
  function isRemembered() {
    // get the index of the message
    const index = props.messageIndex;

    // if the index is 0, or between app.userMessages.length - app.prevMessageCount and app.userMessages.length
    return (
      index === 0 ||
      (index >= props.app.userMessages.length - props.app.prevMessageCount &&
        index < props.app.userMessages.length)
    );
  }

  // function to determine if this message has been marked as important
  // by the user or not
  function isImportant() {
    return props.app.conversations[0].importantIndices.has(props.messageIndex);
  }

  // ref for menuButton
  const menuButtonRef = useRef();

  return (
    <ScaleFade ref={ref} in={inView}>
      <MessageStyled
        borderColor={colorMode === "light" ? colors.darkGray : colors.lightGray}
        // states for displaying the copy button
        onMouseOver={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
        backgroundColor={
          props.from !== "user"
            ? colorMode === "light"
              ? colors.gray
              : "gray.700"
            : "transparent"
        }
        // edit message on click
        onClick={() => {
          if (window.getSelection().toString() === "") {
            //  setEdit(true);
            // set the input's value to the message
            //   document.getElementById("input").value = props.message;
          }
        }}
      >
        {/* message box */}
        <HStack w="100%" minHeight="2rem">
          {/* avatar */}
          {props.from === "user" ? (
            <Box ml={10} mr={5}>
              <VStack>
                {props.app.settings.icons.userIcon}

                {isImportant() && (
                  <VStack>
                    <Button
                      size="xs"
                      colorScheme={props.app.settings.accent}
                    >
                      Important
                    </Button>
                  </VStack>
                )}
              </VStack>
            </Box>
          ) : (
            <Box ml={10} mr={5}>
              {props.app.settings.icons.botIcon}
            </Box>
          )}

          {language !== "unknown" && props.app.settings.codeDetection ? (
            <pre
              className="msg-pre-text"
              style={{ fontFamily: props.app.settings.font }}
            >
              <SyntaxHighlighter
                style={colorMode === "light" ? oneLight : atomDark}
                language={language}
                wrapLines={true}
                wrapLongLines={true}
                lineProps={{
                  style: { wordBreak: "break-word", whiteSpace: "pre-wrap" },
                }}
              >
                {props.message}
              </SyntaxHighlighter>
            </pre>
          ) : (
            <pre
              className="msg-pre-text"
              style={{
                fontFamily: props.app.settings.font,
              }}
            >
              {props.message}
            </pre>
          )}

          {showCopy && !props.app.waiting && (
            <Box>
              <Menu
                colorScheme={props.app.settings.accent}
                placement="bottom-end"
                computePositionOnMount
                isLazy
                preventOverflow
              // should be able to reach the menu no matter
              // the placement without it disappearing
              >
                <MenuButton
                  ref={menuButtonRef}
                  as={Button}
                  size="sm"
                  variant="ghost"
                >
                  <BsLightningCharge />
                </MenuButton>
                <MenuList>
                  <VStack align="left" gap={0}>
                    <Text fontWeight="bold" align="center">
                      Basic Actions
                    </Text>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        // set the input's value to the message
                        props.app.refs.areaRef.current.value = props.message;

                        // copy the message
                        var editingText = props.app.refs.areaRef.current.value;

                        // editing text
                        var title = "Editing message: ";

                        if (editingText.length > 20) {
                          title += editingText.substring(0, 20) + "...";
                        } else {
                          title += editingText;
                        }

                        // show toast
                        toast({
                          render: () => <Toast text={title} app={props.app} />,
                          duration: 1500,
                        });
                      }}
                    >
                      <HStack>
                        <EditIcon />
                        <Text>Edit</Text>
                      </HStack>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // copy props.message to clipbooard
                        navigator.clipboard.writeText(props.message);

                        // show toast
                        toast({
                          render: () => (
                            <Toast text="Copied to clipboard" app={props.app} />
                          ),
                          duration: 2000,
                        });
                      }}
                    >
                      <HStack>
                        <CopyIcon />
                        <Text>Copy</Text>
                      </HStack>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // set the input's value to the message
                        props.app.refs.areaRef.current.value = props.message;

                        // press the submit button
                        props.app.refs.submitRef.current.click();

                        // show toast
                        toast({
                          render: () => (
                            <Toast text="Resubmitted message" app={props.app} />
                          ),
                          duration: 1500,
                        });
                      }}
                    >
                      <HStack>
                        <RepeatIcon />
                        <Text>Resubmit</Text>
                      </HStack>
                    </Button>

                    {/* Marking a message as important
                    this can be done by marking if props.app.messageIndex === app.conversations[0].importantIndices */}
                    <Button
                      variant="ghost"
                      size="sm"
                      colorScheme={isImportant() && props.app.settings.accent}
                      onClick={() => {
                        // if the message is already important, remove it
                        if (isImportant()) {
                          props.app.conversations[0].importantIndices.delete(
                            props.messageIndex
                          );
                        } else {
                          // else add it
                          props.app.conversations[0].importantIndices.add(
                            props.messageIndex
                          );
                        }
                        // set conversations
                        props.app.setConversations([...props.app.conversations]);

                        // set user and bot messages
                        props.app.setUserMessages([...props.app.userMessages]);
                        props.app.setBotMessages([...props.app.botMessages]);

                        // close the menu
                        menuButtonRef.current.click();

                        // close the menu
                        menuButtonRef.current.click();

                        console.log(
                          props.app.conversations[0].importantIndices
                        );

                      }}
                    >
                      <HStack>
                        <StarIcon />
                        <Text>
                          {isImportant() ? "Unmark" : "Mark"} as important
                        </Text>
                      </HStack>
                    </Button>

                    {/* Divider for submenus */}
                    <Divider />
                    <Text fontWeight="bold" align="center">
                      Other Actions
                    </Text>
                    {/* Modal for text actions */}
                    <TextActions
                      app={props.app}
                      message={props.message}
                      messageIndex={props.messageIndex}
                      actionLimit={actionLimit}
                      setActionLimit={setActionLimit}
                      orActionLimit={orActionLimit}
                      setOrActionLimit={setOrActionLimit}
                      from={props.from}
                      isRemembered={props.isRemembered}
                      actionLimitValue={actionLimitValue}
                      setActionLimitValue={setActionLimitValue}
                    />
                    {/* SubMenu for Math / Coding */}
                  </VStack>
                </MenuList>
              </Menu>
            </Box>
          )}
        </HStack>

        {/* end of message box */}
      </MessageStyled>
    </ScaleFade>
  );
};

// copy button
const CopyButton = (props) => {
  // if something is copied, show toast
  const toast = useToast();

  // ScaleFade
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <ScaleFade ref={ref} in={inView}>
      <Button
        size="xs"
        backgroundColor="transparent"
        onClick={(e) => {
          navigator.clipboard.writeText(props.message);
          toast({
            render: () => <Toast text="Copied to clipboard" app={props.app} />,
            duration: 1500,
          });
          e.stopPropagation();
        }}
        // on right click, show a chakra menu with options to copy, edit, delete
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <CopyIcon />
      </Button>
    </ScaleFade>
  );
};

export default Message;
