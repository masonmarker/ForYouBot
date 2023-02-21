/**
 * Settings Panel, includes both the button and the Drawer.
 * 
 * author :
 *  Mason Marker
 */

// React
import React from 'react'

// Chakra components
import {
    Text,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
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

// styled components
import styled from 'styled-components'

// styled SettingsPanel
const SettingsPanelStyled = styled.div`
    .button {
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 1rem;
        margin-right: 7rem;
    }
`

// SettingsPanel component
const SettingsPanel = () => {

    const finalRef = React.useRef(null)


    // drawer state
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <SettingsPanelStyled>
            <Button className="button" onClick={onOpen} colorScheme='purple'>
                Settings
            </Button>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settings</ModalHeader>
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
        </SettingsPanelStyled>
    )
}

export default SettingsPanel