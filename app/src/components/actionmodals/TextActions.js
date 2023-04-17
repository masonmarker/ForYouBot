/**
 * Chakra modal for displaying more actions for a specific message.
 *
 * author :
 *  Mason Marker
 */

// components
import MessagePre from "./../Message";
import ActionModal from "./ActionModal";
import ModalOpenButton from "./ModalOpenButton";
import Tooltip from "./../Tooltip";
import SettingsPanel from "./../SettingsPanel";

// react useEffect
import { useEffect, useState } from "react";

// import Toast
import Toast from "../Toast";

// import common
import { colors } from "../../common/common";

// Chakra components
import {
  Checkbox,
  Divider,
  Input,
  Box,
  ScaleFade,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
  useToast,
  VStack,
  HStack,
  Text,

  // Radio groups
  RadioGroup,
  Radio,
  useRadio,
  Stack,

  // Table
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

// Chakra icons
import { ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";

// ImFileText2 icon
import { ImFileText2 } from "react-icons/im";

// VscDebugContinueSmall icon
import { VscDebugContinueSmall } from "react-icons/vsc";

// react intersection observer
import { useInView } from "react-intersection-observer";

// TextActions component
// thisMessage contains information about the accessing message
const TextActions = ({ thisMessage }) => {
  // Chakra color mode
  const { colorMode } = useColorMode();

  // Chakra toast
  const toast = useToast();

  // handle modal disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack align="left">
      <ModalOpenButton name="Text" icon={<ImFileText2 />} onOpen={onOpen} />

      {/* modal for text information and actions */}
      <TextModal isOpen={isOpen} onClose={onClose} thisMessage={thisMessage} />
    </VStack>
  );
};

// modal for text information and actions
const TextModal = ({ isOpen, onClose, thisMessage }) => {
  return (
    <ActionModal
      isOpen={isOpen}
      onClose={onClose}
      thisMessage={thisMessage}
      header="Text"
      desc="Perform various text-based actions and bot request resubmissions."
    >
      <MessagePreview thisMessage={thisMessage} />
      <Statistics message={thisMessage.message} app={thisMessage.app} />
      <SummarizationExpansion thisMessage={thisMessage} />
    </ActionModal>
  );
};

// statistics of the message
const Statistics = ({ message, app }) => {
  // intersection observer
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Chakra useColorMode
  const { colorMode } = useColorMode();

  // function to count words
  // from http://www.mediacollege.com/internet/javascript/text/count-words.html
  function countWords(s) {
    s = s.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi, " "); //2 or more space to 1
    s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
    return s.split(" ").filter(function (str) {
      return str != "";
    }).length;
  }

  // determines the amount of sentences in the message
  function countSentences(s) {
    return s.split(/[.!?]/).filter((sentence) => sentence).length;
  }

  // count sentences in this message
  const sentences = countSentences(message);

  return (
    <Box>
      <VStack>
        {/* Recreate the above texts but using Chakra's table */}
        <TableContainer
          ref={ref}
          borderWidth="1px"
          // border should be solid
          borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
          borderRadius="md"
          p={3}
          mt={3}
          fontFamily="inherit"
        >
          <Table variant="unstyled">
            <Thead>
              <Tr>
                <Th>characters</Th>
                <Th>words</Th>
                <Th>sentences</Th>
                <Th>
                  <HStack>
                    <Text>paragraphs</Text>
                    <Tooltip
                      app={app}
                      body={
                        <Text>
                          Change your preferred paragraph size in the
                          <strong> settings</strong> panel
                        </Text>
                      }
                    />
                  </HStack>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{message.length}</Td>
                <Td>{countWords(message)}</Td>
                <Td>{sentences}</Td>
                <Td>{Math.floor(sentences / app.settings.paragraphSize)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Box>
  );
};

// Message Preview panel
const MessagePreview = ({ thisMessage }) => {
  // Chakra useColorMode
  const { colorMode } = useColorMode();

  return (
    <Box>
      <VStack
        align="left"
        backgroundColor={colors.panelColor(colorMode)}
        borderRadius="md"
        borderWidth="1px"
        p={4}
        mt={3}
        gap={6}
      >
        <HStack gap={4} w={500}>
          {thisMessage.from === "user" ? (
            <Box m={1}>{thisMessage.app.settings.icons.userIcon}</Box>
          ) : (
            <Box m={1}>{thisMessage.app.settings.icons.botIcon}</Box>
          )}
          <pre
            style={{
              fontFamily: "inherit",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              width: "60%",
            }}
          >
            {thisMessage.app.shortenText("", thisMessage.message, 150)}
          </pre>
        </HStack>
      </VStack>
    </Box>
  );
};

// Summarization and Expansion Menus
const SummarizationExpansion = ({ thisMessage }) => {
  // thisEdit object for keeping track of references and states
  // ----------

  // states for sumValue and expandValue
  const [sumValue, setSumValue] = useState(10);
  const [expandValue, setExpandValue] = useState(10);

  // state for whether 'or less' or 'or more' radios are displayed
  const [showSumOr, setShowSumOr] = useState(false);
  const [showExpandOr, setShowExpandOr] = useState(false);

  // states for sumOr and expandOr
  const [sumOr, setSumOr] = useState("");
  const [expandOr, setExpandOr] = useState("");

  // states for text type
  const [sumTextType, setSumTextType] = useState("characters");
  const [expandTextType, setExpandTextType] = useState("characters");

  // for prop drilling
  var thisEdit = {
    sumValue: sumValue,
    setSumValue: setSumValue,
    expandValue: expandValue,
    setExpandValue: setExpandValue,
    showSumOr: showSumOr,
    setShowSumOr: setShowSumOr,
    showExpandOr: showExpandOr,
    setShowExpandOr: setShowExpandOr,
    sumOr: sumOr,
    setSumOr: setSumOr,
    expandOr: expandOr,
    setExpandOr: setExpandOr,
    sumTextType: sumTextType,
    setSumTextType: setSumTextType,
    expandTextType: expandTextType,
    setExpandTextType: setExpandTextType,

    // refs
    refs: {},
  };

  return (
    // center self and all elements inside
    <HStack align="center" justify="center" mt={4} gap={4}>
      <SumOrExpand
        thisEdit={thisEdit}
        thisMessage={thisMessage}
        title="Summarize"
        // Summarizes this text, method depends on whether the message is remembered or not
        // uses states in thisEdit to complete this task
        //
        // submits the summarization request to the ai
        does={() => {
          // message to send to the ui
          var message = "";

          // if message index is the most recent message
          // then message is "Summarize in "
          if (
            thisMessage.messageIndex ===
            thisMessage.app.userMessages.length - 1
          ) {
            message = "Summarize in ";
          } else if (thisMessage.messageIndex === 0) {
            if (thisMessage.from === "user") {
              message = "Summarize the first message I sent in ";
            } else {
              message = "Summarize the first message you sent in ";
            }
          } else if (thisMessage.isRemembered()) {
            if (thisMessage.from === "user") {
              message =
                "Summarize the message I sent " +
                (thisMessage.app.userMessages.length -
                  thisMessage.messageIndex) +
                " messages ago in ";
            } else {
              message =
                "Summarize the message you sent " +
                (thisMessage.messageIndex - thisMessage.app.prevMessageCount + 1) +
                " messages ago in ";
            }

            // if the message is not remembered, we must resend the entire message
          } else {
            message = thisMessage.message + "\nSummarize this in ";
          }

          // add the value
          message += thisEdit.sumValue + " ";

          // if or is showing
          if (thisEdit.showSumOr) {
            // add the or value
            message += thisEdit.sumOr + " ";
          }

          // add the text type (characters, words, etc.)
          message += thisEdit.sumTextType + " ";

          // send the message to the ai, panel closes automatically
          thisMessage.app.send(message);
        }}
        isSum
      />
      <Divider orientation="vertical" />
      <SumOrExpand
        thisEdit={thisEdit}
        thisMessage={thisMessage}
        title="Expand"
        // Expands the text, also depending on whether its remembered
        does={() => {}}
      />
    </HStack>
  );
};

// Summarizing or expansion component generalization
const SumOrExpand = ({ thisEdit, thisMessage, title, does, isSum }) => {
  // Chakra useColorMode
  const { colorMode } = useColorMode();

  return (
    <VStack>
      <Text>{title} in</Text>

      {/* sumExpandValue */}
      <Input
        w="4rem"
        defaultValue={10}
        // when the value changes, update thisEdit value state
        onChange={(e) => {
          if (isSum) {
            thisEdit.setSumValue(e.target.value);
          } else {
            thisEdit.setExpandValue(e.target.value);
          }
        }}
      />
      <Divider />
      {/* Checkbox for showing more or less*/}
      <Checkbox
        colorScheme={thisMessage.app.settings.accent}
        onChange={(e) => {
          // user wants text amount to vary?
          const variety = e.target.checked;

          if (isSum) {
            thisEdit.setShowSumOr(variety);
          } else {
            thisEdit.setShowExpandOr(variety);
          }
          if (!variety) {
            if (isSum) {
              thisEdit.setSumOr("");
            } else {
              thisEdit.setExpandOr("");
            }
          }
        }}
      >
        variety?
      </Checkbox>

      {/* Group for 'or more' or 'or less' */}
      <RadioGroup
        isDisabled={isSum ? !thisEdit.showSumOr : !thisEdit.showExpandOr}
        defaultValue="more"
        onChange={(value) => {
          if (isSum) {
            thisEdit.setSumOr(value);
          } else {
            thisEdit.setExpandOr(value);
          }
        }}
      >
        <Stack direction="row">
          <Radio value="or more" colorScheme={thisMessage.app.settings.accent}>
            or more
          </Radio>
          <Radio value="or less" colorScheme={thisMessage.app.settings.accent}>
            or less
          </Radio>
        </Stack>
      </RadioGroup>

      <Divider />
      {/* Group for characters, words, sentences, and paragraphs */}
      <RadioGroup
        defaultValue="characters"
        onChange={(value) => {
          if (isSum) {
            thisEdit.setSumTextType(value);
          } else {
            thisEdit.setExpandTextType(value);
          }
        }}
      >
        <Stack direction="column">
          <Radio
            value="characters"
            colorScheme={thisMessage.app.settings.accent}
          >
            characters
          </Radio>
          <Radio value="words" colorScheme={thisMessage.app.settings.accent}>
            words
          </Radio>
          <Radio
            value="sentences"
            colorScheme={thisMessage.app.settings.accent}
          >
            sentences
          </Radio>
          <Radio
            value="paragraph(s)"
            colorScheme={thisMessage.app.settings.accent}
          >
            paragraph(s)
          </Radio>
        </Stack>
      </RadioGroup>

      {/* Submission button */}
      <Button
        colorScheme={thisMessage.app.settings.accent}
        variant="solid"
        w="100%"
        mt={3}
        onClick={does}
      >
        {title}
      </Button>
    </VStack>
  );
};

export default TextActions;
