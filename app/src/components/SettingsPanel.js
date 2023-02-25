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

`

// SettingsPanel component
const SettingsPanel = () => {

    // modal ref
    const finalRef = React.useRef(null)


    // drawer state
    const { isOpen, onOpen, onClose } = useDisclosure()

    // help drawer state
    const { isOpen: isOpenHelp, onOpen: onOpenHelp, onClose: onCloseHelp } = useDisclosure()

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
                        <Text>Settings go here</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='purple' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={onOpenHelp}>
                            Help
                        </Button>

                        <Drawer isOpen={isOpenHelp} placement='bottom' onClose={onCloseHelp}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Help</DrawerHeader>

                                <DrawerBody>
                                    <Text>Help goes here</Text>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button variant='ghost' onClick={onCloseHelp}>
                                        Close
                                    </Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>



                    </ModalFooter>
                </ModalContent>
            </Modal>
        </SettingsPanelStyled>
    )
}

export default SettingsPanel