/**
 * Chakra modal for displaying more actions for a specific message.
 * 
 * author : 
 *  Mason Marker
 */

// react useEffect
import { useEffect } from "react";

// import Toast
import Toast from "../Toast";

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
                size="sm"
                variant="ghost"
                rightIcon={<ChevronRightIcon />}
                onClick={onOpen}
            >
                <HStack>
                    <ImFileText2 />
                    <Text>
                        Text
                    </Text>
                </HStack>
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Text Actions
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Statistics message={thisMessage.message} app={thisMessage.app} />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme={thisMessage.app.settings.accent}
                            mr={3}
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </VStack>
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
        s = s.replace(/(^\s*)|(\s*$)/gi, "");//exclude  start and end white-space
        s = s.replace(/[ ]{2,}/gi, " ");//2 or more space to 1
        s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
        return s.split(' ').filter(function (str) { return str != ""; }).length;
    }

    return (
        <VStack>
            {/* Recreate the above texts but using Chakra's table */}
            <TableContainer ref={ref}>
                <Table 
                colorScheme={app.settings.accent}
                variant="simple">
                    <Thead>
                        <Tr>
                            <Th>characters</Th>
                            <Th>words</Th>
                            <Th>sentence count</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{message.length}</Td>
                            <Td>{countWords(message)}</Td>
                            <Td>{message.split(/[.!?]/).filter(sentence => sentence).length}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </VStack>
    );
};

export default TextActions;