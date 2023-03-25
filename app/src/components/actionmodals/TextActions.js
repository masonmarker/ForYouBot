/**
 * Chakra modal for displaying more actions for a specific message.
 *
 * author :
 *  Mason Marker
 */

// components
import MessagePre from "./../Message";
import ActionModal from "./ActionModal";

// react useEffect
import { useEffect } from "react";

// import Toast
import Toast from "../Toast";

// import common
import { colors } from "../../common/common";

// Chakra components
import {
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
      <Button
        size="xs"
        variant="ghost"
        rightIcon={<ChevronRightIcon />}
        onClick={onOpen}
      >
        <HStack>
          <ImFileText2 />
          <Text>Text</Text>
        </HStack>
      </Button>

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

  return (
    <Box>
      <VStack>
        {/* Recreate the above texts but using Chakra's table */}
        <TableContainer ref={ref}>
          <Table colorScheme={app.settings.accent} variant="simple">
            <Thead>
              <Tr>
                <Th>characters</Th>
                <Th>words</Th>
                <Th>sentences</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{message.length}</Td>
                <Td>{countWords(message)}</Td>
                <Td>
                  {message.split(/[.!?]/).filter((sentence) => sentence).length}
                </Td>
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
  return <HStack></HStack>;
};
export default TextActions;
