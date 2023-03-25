/**
 * Customized Button for opening a modal
 * 
 * authors:
 *  Mason Marker
 *  Harris Chaudhry
 */



// Chakra components
import {
    Button,
    HStack,
    Text,
} from "@chakra-ui/react";

// ChevronRightIcon
import { ChevronRightIcon } from "@chakra-ui/icons";


// ModalOpenButton
const ModalOpenButton = ({ name, onOpen, icon }) => {
    return (
        <Button
            size="xs"
            variant="ghost"
            rightIcon={<ChevronRightIcon />}
            onClick={onOpen}
        >
            <HStack>
                {icon}
                <Text>{name}</Text>
            </HStack>
        </Button>
    );
};


export default ModalOpenButton;