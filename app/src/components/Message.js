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
import CodingActions from "./actionmodals/CodingActions";


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
  InfoIcon,
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

  // message attributes for actions
  // app={props.app}
  // message={props.message}
  // messageIndex={props.messageIndex}
  // actionLimit={actionLimit}
  // setActionLimit={setActionLimit}
  // orActionLimit={orActionLimit}
  // setOrActionLimit={setOrActionLimit}
  // from={props.from}
  // isRemembered={props.isRemembered}
  // actionLimitValue={actionLimitValue}
  // setActionLimitValue={setActionLimitValue}
  const thisMessage = {
    message: props.message,
    messageIndex: props.messageIndex,
    actionLimit: actionLimit,
    setActionLimit: setActionLimit,
    orActionLimit: orActionLimit,
    setOrActionLimit: setOrActionLimit,
    from: props.from,
    isRemembered: isRemembered,
    isImportant: isImportant,
    actionLimitValue: actionLimitValue,
    setActionLimitValue: setActionLimitValue,
    app: props.app,
    language: language,
    menuButtonRef: menuButtonRef,
    showCopy: showCopy,
    // close the action menu
    onClose: onClose,
  };

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
        }>

        {/* message box */}
        <MessageBox thisMessage={thisMessage} />

        {/* Section for additional message information */}
        <AdditionalInfo isImportant={isImportant} from={props.from} />

        {/* end of message box */}
      </MessageStyled>
    </ScaleFade>
  );
};

// message box
const MessageBox = ({ thisMessage }) => {


  // Chakra color mode
  const { colorMode } = useColorMode();

  return (<HStack w="100%" minHeight="2rem">
    {/* avatar */}
    {thisMessage.from === "user" ? (
      <Box ml={10} mr={5}>
        {thisMessage.app.settings.icons.userIcon}
      </Box>
    ) : (
      <Box ml={10} mr={5}>
        {thisMessage.app.settings.icons.botIcon}
      </Box>
    )}

    {thisMessage.language !== "unknown" && thisMessage.app.settings.codeDetection ? (
      <MessagePre app={thisMessage.app} message={thisMessage.message}>
        <SyntaxHighlighter
          style={colorMode === "light" ? oneLight : atomDark}
          language={thisMessage.language}
          wrapLines={true}
          wrapLongLines={true}
          lineProps={{
            style: { wordBreak: "break-word", whiteSpace: "pre-wrap" },
          }}
        >
          {thisMessage.message}
        </SyntaxHighlighter>
      </MessagePre>
    ) : (
      <MessagePre app={thisMessage.app} message={thisMessage.message} />
    )}

    {thisMessage.showCopy && !thisMessage.app.waiting && (
      <Box>
        <Menu
          colorScheme={thisMessage.app.settings.accent}
          placement="bottom-end"
          computePositionOnMount
          isLazy
          preventOverflow
          closeOnBlur={false}

        // should be able to reach the menu no matter
        // the placement without it disappearing
        >
          <MenuButton
            ref={thisMessage.menuButtonRef}
            as={Button}
            size="sm"
            variant="ghost"
          >
            <BsLightningCharge />
          </MenuButton>
          <MenuList>
            <VStack align="left" gap={0} m={0}>
              <Text fontWeight="bold" align="center">
                Basic Actions
              </Text>

              {/* Basic Action Button for editing */}
              <BasicButton
                thisMessage={thisMessage}
                name="Edit"
                icon={<EditIcon />}
                does={() => {
                  // set the input's value to the message
                  thisMessage.app.refs.areaRef.current.value = thisMessage.message;

                  // shorten the text
                  const title = thisMessage.app.shortenText(
                    "Editing message: ",
                    thisMessage.message,
                    20
                  );

                  // show toast
                  thisMessage.app.showToast(title, 1500);
                }} />

              {/* Basic Action Button for copying */}
              <BasicButton
                thisMessage={thisMessage}
                name="Copy"
                icon={<CopyIcon />}
                does={() => {
                  // copy props.message to clipbooard
                  navigator.clipboard.writeText(thisMessage.message);

                  // shortened text
                  const title = thisMessage.app.shortenText(
                    "Copied message: ",
                    thisMessage.message,
                    20
                  );

                  // show toast
                  thisMessage.app.showToast(title, 2000);
                }} />


              {/* Basic Action Button for resubmitting */}
              <BasicButton
                thisMessage={thisMessage}
                name="Resubmit"
                icon={<RepeatIcon />}
                does={() => {
                  // set the input's value to the message
                  thisMessage.app.refs.areaRef.current.value = thisMessage.message;

                  // press the submit button
                  thisMessage.app.refs.submitRef.current.click();

                  // shortened text
                  const title = thisMessage.app.shortenText(
                    "Resubmitted message: ",
                    thisMessage.message,
                    20
                  );

                  // show toast
                  thisMessage.app.showToast(title, 1500);
                }} />

              {/* Marking a message as important basic button
              this can be done by marking if props.app.messageIndex === app.conversations[0].importantIndices
              icon is StarIcon, name is {thisMessage.isImportant() ? "Unmark" : "Mark"} as important

              
              */}
              <BasicButton
                thisMessage={thisMessage}
                name={`${thisMessage.isImportant() ? "Unmark" : "Mark"} as important`}
                icon={<StarIcon />}
                does={() => {
                  // if the message is already important, remove it
                  if (thisMessage.isImportant()) {
                    thisMessage.app.conversations[0].importantIndices.delete(
                      thisMessage.messageIndex
                    );
                  } else {
                    // else add it
                    thisMessage.app.conversations[0].importantIndices.add(
                      thisMessage.messageIndex
                    );
                  }

                  // re-render message / conversation components
                  thisMessage.app.reRender();

                  // close the menu
                  thisMessage.menuButtonRef.current.click();

                  // show toast
                  thisMessage.app.showToast(thisMessage.isImportant()
                    ? "Message marked as important"
                    : "Message unmarked as important", 1500);
                }} />


              {/* Divider for submenus */}
              <Divider />
              <Text fontWeight="bold" align="center">
                Other Actions
              </Text>
              {/* Modal for text actions */}
              <TextActions thisMessage={thisMessage} />
              {/* SubMenu for Math / Coding */}
              <CodingActions thisMessage={thisMessage} />
            </VStack>
          </MenuList>
        </Menu>
      </Box>
    )}
  </HStack>);
};

// Basic Actions button
const BasicButton = ({ thisMessage, does, name, icon }) => {
  return (
    <Button
      size="xs"
      variant="ghost"
      m={0}
      onClick={does}
    >
      <HStack>
        {icon}
        <Text>{name}</Text>
      </HStack>
    </Button>
  );
};

// actual message <pre>
const MessagePre = (props) => {
  return (
    <pre
      className="msg-pre-text"
      style={{
        fontFamily: props.app.settings.font,
      }}
    >
      {props.message && props.message}
      {props.children}
    </pre>
  );
};

// additional information for the current message
const AdditionalInfo = ({ isImportant, from }) => {
  // margin style for children
  const marginStyles = {
    marginTop: "0.5rem",
    marginLeft: "5rem",
  };

  return (
    <HStack>
      {/* important */}
      {isImportant() && from === "user" && (
        <Button
          size="xs"
          colorScheme="red"
          style={marginStyles}
          cursor="default"
        >
          Important
        </Button>
      )}
    </HStack>
  );
};


export default Message;
export { MessagePre };
