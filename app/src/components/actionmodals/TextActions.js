/**
 * Chakra modal for displaying more actions for a specific message.
 * 
 * author : 
 *  Mason Marker
 */

// import Toast
import Toast from "../Toast";

// Chakra components
import {
    Box,
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

export default TextActions;