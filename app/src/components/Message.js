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
  HStack,
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

  // fading
  ScaleFade,

  // states
  useDisclosure,
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
import { CopyIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";

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
          {language !== "unknown" ? (
            <pre
              className="msg-pre-text"
              style={{ fontFamily: props.app.settings.font }}
            >
              <SyntaxHighlighter
                language={
                  props.app.language === "Auto Detect"
                    ? language
                    : props.app.language
                }
                style={colorMode === "light" ? oneLight : atomDark}
              >
                {props.message}
              </SyntaxHighlighter>
            </pre>
          ) : (
            <pre>{props.message}</pre>
          )}

          {showCopy && (
            <HStack>
              {/* <CopyButton message={props.message} /> */}
              <ScaleFade in={showCopy}>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={(e) => {
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
                  <EditIcon />
                </Button>
              </ScaleFade>

              {/* Edit Message modal */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Message</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Textarea defaultValue={props.message} />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme={props.accent} onClick={handleResubmit}>
                      Resend
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </HStack>
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
