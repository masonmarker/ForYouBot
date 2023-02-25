/**
 * Side menu panel, capable of being placed 
 * on any side of the screen
 * 
 * author : 
 *  Mason Marker
 */

// React
import React from "react"

// styled components
import styled from "styled-components"

// Chakra components
import {
    RadioGroup,
    Stack,
    Radio,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerCloseButton,
    Text,
    useDisclosure,
    useColorMode,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

// styled SidePanel
// should be permanently in the bottom right corner
const SidePanelStyled = styled.div`

`

// SidePanel component
const SidePanel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const finalRef = React.useRef(null)


    return (
        <SidePanelStyled>
            <Button className="button" colorScheme='purple' onClick={onOpen}>
                Edit Bot
            </Button>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Bot</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Hello
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='purple' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </SidePanelStyled>
    )
}



export default SidePanel