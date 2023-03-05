/**
 * Title component at the bottom of the screen.
 * if no conversation has been loaded, it will display
 * the most recent conversation initiated.
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// components
import Convos from './Convos'

// SidePanel
import SidePanel from './SidePanel'

// Settings Panel
import SettingsPanel from './SettingsPanel'

// React
import { useEffect, useState } from 'react'

// Chakra components
import {
    Box,
    useColorMode,
    Text,
    Button,
    HStack,
    Spinner,
    Fade,

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
import {
    ViewIcon,
    MoonIcon,
    SunIcon,
    AddIcon
} from '@chakra-ui/icons'

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

    .clear-conversation {
        position: fixed;
        left: 4.8rem;
    }

    &:hover {
        cursor: pointer;
        background-color: ${props => props.backgroundColorHover};
    }


`

// Title component
const Title = ({
    userMessages,
    botMessages,
    conversations,
    setConversations,
    setUserMessages,
    setBotMessages,
    generating,
}) => {

    // grab current color mode
    const { colorMode, toggleColorMode } = useColorMode()

    // hover state
    const [hover, setHover] = useState(false)

    // modal for changing conversation
    const { isOpen, onOpen, onClose } = useDisclosure()

    // clears the current conversation
    const clearConversation = () => {
        conversations[0].name = "New Conversation"
        setConversations(conversations)
        setUserMessages([])
        setBotMessages([])
    }

        // keep conversations updated
        useEffect(() => {
            var displayingConversations = conversations
            displayingConversations[0].user = userMessages
            displayingConversations[0].bot = botMessages
            setConversations(displayingConversations)
        }, [userMessages, botMessages, conversations, setConversations])

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
            <Button className='clear-conversation' colorScheme="purple"
                onClick={(e) => {
                    clearConversation()
                    e.stopPropagation()
                }
                }>Clear Conversation
            </Button>
            <HStack>
                <Text
                    color={colorMode === "light" ? "white" : "black"}
                    id="current-convo"
                >
                    {conversations[0] ?
                        conversations[0].name :
                        "New Conversation"
                    }
                </Text>
                {hover && <ViewIcon color={colorMode === "light" ? "white" : "black"} />}
                {generating &&
                    <Fade in={generating}>
                        <Spinner
                            color={colorMode === "light" ? "white" : "black"}
                        />
                    </Fade>}
            </HStack>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack gap="0.5rem">
                            <Text>Conversations</Text>

                            {/* Adding a conversation */}
                            <Button
                                colorScheme="purple"
                                size="sm"
                                onClick={() => {
                                    setConversations([...conversations, {
                                        name: "New Conversation",
                                        user: [],
                                        bot: []
                                    }])
                                }}
                            >
                                <AddIcon />
                            </Button>



                        </HStack>
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody>
                        <Convos
                            conversations={conversations}
                            setConversations={setConversations}
                            setUserMessages={setUserMessages}
                            setBotMessages={setBotMessages}
                        />
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