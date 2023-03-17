/**
 * Message box, shows either a user response request or a message from the bot
 *
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// states
import { useState, useRef, useEffect } from "react";

// Toast
import Toast from "./Toast";

// Chakra components
import {
  // general
  useColorMode,
  useToast,
  Box,
  Text,
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
import { CopyIcon, EditIcon, RepeatIcon, QuestionOutlineIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";

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

  return (
    <ScaleFade ref={ref} in={inView} {...props}>
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
              {props.app.settings.icons.userIcon}
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

          {showCopy && !props.app.waiting &&
            <Box>
              <Menu
                colorScheme={props.app.settings.accent}
                placement="bottom"
                computePositionOnMount
                isLazy>
                <MenuButton
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

                    {/* Divider for submenus */}
                    <Divider />
                    <Text fontWeight="bold" align="center">Other Actions</Text>
                    {/* SubMenu for text actions */}
                    <Menu
                      colorScheme={props.app.settings.accent}
                      placement="bottom-start"
                      computePositionOnMount
                      isLazy
                    >
                      <MenuButton
                        size="sm"

                        variant="ghost"
                        as={Button}
                        align="center"
                        rightIcon={<ChevronRightIcon />}
                      >
                        <HStack align="center">
                          <ImFileText2
                            style={{
                              color: colorMode === "light" ? "black" : "white",
                            }}
                          />
                          <Text>Text</Text>
                        </HStack>
                      </MenuButton>

                      {/* Additional text operations */}
                      <MenuList>
                        <VStack align="left">
                          <Button
                            size="sm"

                            variant="ghost"
                            onClick={() => {
                              // input to ask the bot
                              var input = `Elaborate on this:\n${props.message}`;

                              // set the input's value to the message
                              props.app.refs.areaRef.current.value = input;

                              // press the submit button
                              props.app.refs.submitRef.current.click();

                              // show toast
                              toast({
                                render: () => (
                                  <Toast
                                    text="Elaboration Requested"
                                    app={props.app}
                                  />
                                ),
                                duration: 1500,
                              });
                            }}
                          >
                            <HStack>
                              <ViewIcon />
                              <Text>Elaborate</Text>
                            </HStack>
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              // prepare message to send
                              var input = `Continue this:\n${props.message}`;

                              // set the input's value to the message
                              props.app.refs.areaRef.current.value = input;

                              // press the submit button
                              props.app.refs.submitRef.current.click();

                              // show toast
                              toast({
                                render: () => (
                                  <Toast
                                    text="Continuation Requested"
                                    app={props.app}
                                  />
                                ),
                                duration: 1500,
                              });
                            }}
                          >
                            <HStack>
                              <VscDebugContinueSmall />
                              <Text>Continue</Text>
                            </HStack>
                          </Button>

                          {/* Menu for Summmarizing Text */}
                          <Menu
                            colorScheme={props.app.settings.accent}
                            placement="bottom-start"
                            computePositionOnMount
                            isLazy
                          >
                            <MenuButton
                              size="sm"
                              variant="ghost"
                              as={Button}
                              align="center"
                              rightIcon={<ChevronRightIcon />}
                            >
                              <HStack align="center">
                                <ImFileText2
                                  style={{
                                    color:
                                      colorMode === "light" ? "black" : "white",
                                  }}
                                />
                                <Text>Summarize</Text>
                              </HStack>
                            </MenuButton>
                            <MenuList>
                              <VStack align="center">
                                <Text>Summarize message to:</Text>
                                <Input w="50%" placeholder="10"/>
                              </VStack>
                            </MenuList>
                          </Menu>



                        </VStack>
                      </MenuList>
                    </Menu>

                    {/* SubMenu for Math / Coding */}

                  </VStack>
                </MenuList>
              </Menu>
            </Box>
          }

        </HStack>

        {/* end of message box */}
      </MessageStyled>
    </ScaleFade >
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
