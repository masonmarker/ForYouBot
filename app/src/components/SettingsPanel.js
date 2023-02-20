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
    useDisclosure
} from "@chakra-ui/react"

// Chakra settings icon
import { SettingsIcon } from '@chakra-ui/icons'

// styled components
import styled from 'styled-components'

// styled SettingsPanel
const SettingsPanelStyled = styled.div`


    /* bottom left corner, directly above ColorButton */
    .button {
        position: fixed;
        bottom: 0;
        left: 0;
        margin: 1rem;
        margin-bottom: 4rem;
    }

    /* button should move to bottom middle when width below 1000px*/
    @media (max-width: 1300px) {
        .button {
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 1rem;
        }
    }


`

// SettingsPanel component
const SettingsPanel = () => {

    // drawer state
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <SettingsPanelStyled>
            <Button className="button" onClick={onOpen} colorScheme='purple'>
                <SettingsIcon />
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