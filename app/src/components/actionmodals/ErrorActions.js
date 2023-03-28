/**
 * Error Actions modal, used for fixing or refining a previous mistake.
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// components
import ActionModal from "./ActionModal";
import ModalOpenButton from "./ModalOpenButton";

// Chakra components
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast,
    Text,
    Box,
    VStack
} from "@chakra-ui/react";

// GiAutoRepair react icon
import { GiAutoRepair } from "react-icons/gi";






// ErrorActions component
const ErrorActions = ({ thisMessage }) => {

    // handle modal disclosure
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack align="left">
            <ModalOpenButton
                name="Repair"
                icon={<GiAutoRepair />}
                onOpen={onOpen}
            />
            <ActionModal
                isOpen={isOpen}
                onClose={onClose}
                thisMessage={thisMessage}
                header="Repair"
                desc="Fix a previous mistake."
            >


            </ActionModal>
        </VStack>
    );
};

export default ErrorActions;