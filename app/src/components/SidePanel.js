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
    Text,
    useDisclosure
} from "@chakra-ui/react"

// styled SidePanel
// should be permanently in the bottom right corner
const SidePanelStyled = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

// SidePanel component
const SidePanel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <SidePanelStyled>
            <Button colorScheme='purple' onClick={onOpen}>
                Edit Bot
            </Button>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader
                        borderBottomWidth='1px'
                        fontSize="3xl"
                    >Bot Specifics</DrawerHeader>
                    <DrawerBody>
                        <Text>stuff</Text>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </SidePanelStyled>
    )
}



export default SidePanel