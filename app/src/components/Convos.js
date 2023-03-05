/**
 * Conversations panel, grants the ability to switch between conversations
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// Chakra components
import {
    Box,
    Button,
    HStack,
    VStack,
    Text,
    ScaleFade,
    Input,
    useColorMode
} from "@chakra-ui/react"

// Check icon
import { CheckIcon } from '@chakra-ui/icons'

// styled components
import styled from 'styled-components'

// intersection observer
import { useInView } from 'react-intersection-observer'

// individual conversation styled
const ConvoStyled = styled(VStack)`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 10%;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    border: 1px solid ${props => props.color};
    border-radius: 5px;
    margin: 5px 0;
    padding: 5px;
    cursor: pointer;

    .title {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0.5rem;        
    }

`

// Convos component
const Convos = ({
    conversations,
    setConversations,
    userMessages,
    botMessages,
    setUserMessages,
    setBotMessages,
    onClose
}) => {

    // use intersection observer
    const [ref, inView] = useInView({
        threshold: 0,
    })

    // conversations format:
    // conversations[0].user[0] = {date: from: message:}

    return (
        <Box>
            {conversations[0]
                ? conversations.map((convo, index) => (
                    <ScaleFade in={inView} ref={ref} key={`convo-${index}`}>
                        <ConvoStyled key={`convo-${index}`}>
                            <Text className="title">{convo.name}</Text>
                            <HStack>

                                {/* Sets this conversation to the current conversation */}
                                <Button onClick={() => {

                                    // switch the current conversation to the selected conversation
                                    const currentConversation = conversations[0]
                                    const newConversations = conversations
                                    newConversations[0] = convo
                                    newConversations[index] = currentConversation
                                    setConversations(newConversations)
                                    setUserMessages(convo.user)
                                    setBotMessages(convo.bot)

                                    // close the model  
                                    onClose()
                                    
                                }}>
                                    Open
                                </Button>

                                {/* Rename this conversation */}
                                <Button onClick={() => {
                                    // shows an Input
                                    
                                }}>
                                    Rename
                                </Button>

                                {/* Preview this conversation */}
                                <Button>
                                    Preview
                                </Button>

                                {/* Remove this conversation */}
                                <Button>
                                    Remove
                                </Button>
                            </HStack>
                        </ConvoStyled>
                    </ScaleFade>

                )) :
                <Text>No conversations</Text>
            }
        </Box>
    )
}

export default Convos