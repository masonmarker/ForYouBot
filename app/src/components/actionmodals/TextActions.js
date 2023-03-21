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
const TextActions = ({
    app,
    actionLimit,
    setActionLimit,
    orActionLimit,
    setOrActionLimit,
    message,
    from,
    messageIndex,
    isRemembered,
    actionLimitValue,
    setActionLimitValue
}) => {

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
                        <Statistics message={message} />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme={app.settings.accent}
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
const Statistics = ({ message }) => {

    // intersection observer
    const { ref, inView } = useInView({
        threshold: 0,
    });

    return (
        <ScaleFade in={inView} ref={ref}>
            <VStack>

                {/* Character count */}
                <Text>characters: {message.length}</Text>

                {/* Word count */}
                <Text>words: {message.split(" ").length}</Text>

                {/* Sentence count, including all punctuation */}
                <Text>sentence count: {message.split(/[.!?]/).filter(sentence => sentence).length}</Text>


            </VStack>
        </ScaleFade>
    );
}

export default TextActions;