/**
 * Conversations panel, grants the ability to switch between conversations
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React, { useEffect } from 'react'

// Chakra components
import {
    Box,
    Button,
    HStack,
    Text,
    ScaleFade,
    useColorMode
} from "@chakra-ui/react"
// styled components
import styled from 'styled-components'

// intersection observer
import { useInView } from 'react-intersection-observer'

// individual conversation styled
const ConvoStyled = styled(HStack)`

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
        font-weight: bold;
        margin-right: 1rem;
    }

`

// Convos component
const Convos = ({ 
    conversations,
    setConversations,
    userMessages,
    botMessages,
}) => {

    // use color mode
    const { colorMode } = useColorMode()

    // use intersection observer
    const [ref, inView] = useInView({
        threshold: 0,
    })

    // conversations format:
    // conversations[0].user[0] = {date: from: message:}

    return (
        <Box>
            <Text>Conversations</Text>
            {conversations[0] 
            ? conversations.map((convo, index) => (
                <ScaleFade in={inView} ref={ref} key={`convo-${index}`}>
                    <ConvoStyled key={`convo-${index}`}>
                        <Text className="title">{conversations[0].name}</Text>
                        {/* <Text>first user message: {convo.user[0]?.message}</Text>
        <Text>first bot message: {convo.bot[0]?.message}</Text> */}
                        <Button variant="ghost">
                            Open
                        </Button>
                        <Button variant="ghost">
                            Remove
                        </Button>
                    </ConvoStyled>
                </ScaleFade>

            )) :
                <Text>No conversations</Text>
            }
        </Box>
    )
}

export default Convos