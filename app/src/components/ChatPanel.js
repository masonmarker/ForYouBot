/**
 * ChatPanel: Displays the chat history of the current thread.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React, { useState, useEffect, useRef } from 'react'

// components
import Title from './Title'
import Message from './Message'

// Chakra components
import {
    useColorMode,
    Text,
    Box,
    ScaleFade,
    useDisclosure
} from "@chakra-ui/react"

// styled components
import styled from 'styled-components'

// common 
import { colors } from '../common/common'

// useMessages
import { useMessages } from '../messages/messages'

// intersection observer
import { useInView } from 'react-intersection-observer';

// styled ChatPanel
// should exist in the center of the screen
// vertically and horizontally
// include all props
const ChatPanelStyled = styled.div`
    width: 100vw;
    height: 72vh;
    background-color: ${props => props.backgroundColor};

    .chat {
        height: 90%;
        width: 100%;
        overflow-y: scroll;
    }
`

// ChatPanel component
// should re-render each time a message is pushed to messages
const ChatPanel = ({ messages }) => {

    // grab current color mode
    const { colorMode } = useColorMode()

    // ref for scrolling to bottom
    const bottomRef = useRef()

    // scroll to bottom
    useEffect(() => {
        bottomRef.current.scrollIntoView()
    }, [messages])

    // return
    return (
        <ChatPanelStyled 
            backgroundColor={colorMode === "light" ? colors.lightGray : colors.darkGray}>

            {/* Title for switching conversations */}
            <Title />

            {/* Chat History */}
            <Box className="chat">
                <div id="chat">
                    {messages.map((message, index) => {
                        return (
                            <Message
                                key={index}
                                message={message.message}
                                from={message.from}
                                date={message.date}
                            />
                        )
                    })}
                    <div ref={bottomRef}/>
                </div>
            </Box>
        </ChatPanelStyled>
    )
}

export default ChatPanel