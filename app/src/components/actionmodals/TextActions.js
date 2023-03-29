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

// react useEffect
import { useEffect } from "react";

// import Toast
import Toast from "../Toast";

// import common
import { colors } from "../../common/common";

// Chakra components
import {
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
        >
          <Table variant="unstyled">
            <Thead>
              <Tr>
                <Th>characters</Th>
                <Th>words</Th>
                <Th>sentences</Th>
                <Th>paragraphs</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{message.length}</Td>
                <Td>{countWords(message)}</Td>
                <Td>{sentences}</Td>
                <Td>{Math.floor(sentences / 5)}</Td>
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
  // expansion or summarization refs

  // expansion or summarization states

  return (
    // center self and all elements inside
    <HStack align="center" justify="center" mt={4} gap={4}>
      <SumOrExpand
        thisMessage={thisMessage}
        title="Summarize"
        // Summarizes this text, method depends on whether the message is remembered or not
        does={() => {}}
      />
      <Divider orientation="vertical" />
      <SumOrExpand
        thisMessage={thisMessage}
        title="Expand"
        // Expands the text, also depending on whether its remembered
        does={() => {}}
      />
    </HStack>
  );
};

// Summarizing or expansion component generalization
const SumOrExpand = ({ thisMessage, title, does }) => {
  // Chakra useColorMode
  const { colorMode } = useColorMode();

  return (
    <VStack>
      <Text>{title} in</Text>

      {/* sumExpandValue */}
      <Input w="4rem" placeholder="10" />
      <Divider />
      {/* Group for 'or more' or 'or less' */}
      <RadioGroup defaultValue="more">
        <Stack direction="row">
          <Radio value="more" colorScheme={thisMessage.app.settings.accent}>
            or more
          </Radio>
          <Radio value="less" colorScheme={thisMessage.app.settings.accent}>
            or less
          </Radio>
        </Stack>
      </RadioGroup>
      <Divider />
      {/* Group for characters, words, sentences, and paragraphs */}
      <RadioGroup defaultValue="characters">
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
            value="paragraphs"
            colorScheme={thisMessage.app.settings.accent}
          >
            paragraphs
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
