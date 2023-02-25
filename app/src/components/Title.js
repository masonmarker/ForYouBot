/**
 * Title component at the bottom of the screen.
 * if no conversation has been loaded, it will display
 * the most recent conversation initiated.
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// SidePanel
import SidePanel from './SidePanel'

// Settings Panel
import SettingsPanel from './SettingsPanel'

// ColorButton
import ColorButton from './ColorButton'

// React
import React from 'react'

// Chakra components
import {
    Box,
    useColorMode,
    Text,
    Button,
    HStack,

    // modal for changing conversation
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,


} from "@chakra-ui/react"

// Chakra more icon
import { ViewIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

// styled components
import styled from 'styled-components'

// common
import { colors, css } from '../common/common'

// styled Title
// centered horizontally
const TitleStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    width: 100%;
    background-color: ${props => props.backgroundColor};
    transition: ${css.transition};

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: fixed;
        right: 0.8rem;
        gap: 8px;        
    }

    .color {
        position: fixed;
        left: 0.8rem;
    }

    &:hover {
        cursor: pointer;
        background-color: ${props => props.backgroundColorHover};
    }


`

// Title component
const Title = () => {

    // grab current color mode
    const { colorMode, toggleColorMode } = useColorMode()

    // hover state
    const [hover, setHover] = React.useState(false)

    // modal for changing conversation
    const { isOpen, onOpen, onClose } = useDisclosure()

    // title hovering?
    return (
        <TitleStyled
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}

            // on click, open modal for changing conversation
            onClick={onOpen}

            backgroundColor={colorMode === "light" ? colors.purple : colors.lighterPurple}
            backgroundColorHover={colorMode === "light" ? colors.lightPurple : colors.purple}

            

        >
            <Button 
                className="color"
                colorScheme="purple" 
                onClick={(e) => {
                    toggleColorMode()
                    e.stopPropagation()
                }} 
            >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <HStack>
                <Text 
                    color={colorMode === "light" ? "white" : "black"}
                    id="current-convo"
                >
                    New Conversation
                </Text>
                {hover && <ViewIcon color={colorMode === "light" ? "white" : "black"}
                 />}
            </HStack>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Conversations</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Conversations</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="purple" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box className="buttons">
                <SidePanel />
                <SettingsPanel />
            </Box>
        </TitleStyled>
    )
}

export default Title