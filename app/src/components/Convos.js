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
    Text,

    useColorMode
} from "@chakra-ui/react"

// styled components
import styled from 'styled-components'


// individual conversation styled
const ConvoStyled = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10%;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
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

    // conversations format:
    // conversations[0].user[0] = {date: from: message:}

    return (
        <Box>
            <Text>Conversations</Text>
            {conversations[0] 
            ? conversations.map((convo, index) => {
                return (
                    <ConvoStyled
                        key={`convo-${index}`}
                        backgroundColor={colorMode === "light" ? "black" : "white"}
                        color={colorMode === "light" ? "white" : "black"}
                    >
                        <Text>name: {conversations[0].name}</Text>
                        <Text>first user message: {convo.user[0]?.message}</Text>
                    </ConvoStyled>

                )
            }) :
                <Text>No conversations</Text>
            }
        </Box>
    )
}

export default Convos