/**
 * Settings Panel, includes both the button and the Drawer.
 * 
 * author :
 *  Mason Marker
 */

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
    useColorMode
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

    // drawer state
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <SettingsPanelStyled>
            <Button className="button" onClick={onOpen} colorScheme='purple'>
                Settings
            </Button>

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Settings
                    </DrawerHeader>
                    <DrawerBody>
                        <Text>stuff</Text>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </SettingsPanelStyled>
    )
}

export default SettingsPanel