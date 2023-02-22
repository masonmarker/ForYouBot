/**
 * Title component at the bottom of the screen.
 * if no conversation has been loaded, it will display
 * the most recent conversation initiated.
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React from 'react'

// Chakra components
import {
    useColorMode,
    Text,
    Button,

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

    /* should be on the far right */
    .change {
        position: fixed;
        right: 1rem;
        color: white;
    }

    &:hover {
        cursor: pointer;
        background-color: ${props => props.backgroundColorHover};
    }

`

// Title component
const Title = () => {

    // grab current color mode
    const { colorMode } = useColorMode()

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
            onClick={() => onOpen()}

            backgroundColor={colorMode === "light" ? colors.purple : colors.lightPurple}
            backgroundColorHover={colorMode === "light" ? colors.lightPurple : colors.purple}

        >
            <Text color="white">New Conversation</Text>
            {hover && <Text className="change" fontSize="sm">Change Conversation</Text>}

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


        </TitleStyled>
    )
}

export default Title