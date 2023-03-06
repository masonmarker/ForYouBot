/**
 * Conversations panel, grants the ability to switch between conversations
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React, { useState } from 'react'

// Chakra components
import {
    Box,
    Button,
    HStack,
    VStack,
    Text,
    ScaleFade,
    Input,
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

    // are you sure state (conversation removal)
    const [areYouSure, setAreYouSure] = useState(false)

    // renaming index state
    const [renameIndex, setRenameIndex] = useState(null)

    // conversations format:
    // conversations[0].user[0] = {date: from: message:}

    return (
        <Box>
            {conversations[0]
                ? conversations?.map((convo, index) => (
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
                                <Button index={index} onClick={(e) => {

                                    // get the index of the rendering conversation
                                    const index = e.target.getAttribute("index")

                                    // if areYouSure is true, then the user is renaming the conversation
                                    setAreYouSure(!areYouSure)

                                    // set the renaming index
                                    setRenameIndex(index)

                                    console.log(renameIndex)
                                }}>
                                    {areYouSure && renameIndex === index ?
                                        "Cancel Rename" : "Rename"}
                                </Button>

                                {/* Preview this conversation */}
                                <Button>
                                    Preview
                                </Button>

                                {/* Remove the conversation */}
                                {conversations?.length > 1 && <Button onClick={() => {

                                    // remove the conversation from the conversations array
                                    const newConversations = conversations
                                    newConversations.splice(index, 1)
                                    setConversations(newConversations)

                                    // reset the current conversation to the user's messages
                                    setUserMessages(newConversations[0].user)
                                    setBotMessages(newConversations[0].bot)

                                    // close the model
                                    onClose()
                                }}>
                                    Remove
                                </Button>}
                            </HStack>


                            {/* Render renaming components for this conversation only
                            if areYouSure */}
                            {areYouSure && renameIndex === index &&
                                <HStack>
                                    <Input placeholder="New name" />
                                    <Button>
                                        <CheckIcon />
                                    </Button>
                                </HStack>
                            }


                        </ConvoStyled>
                    </ScaleFade>

                )) :
                <Text>No conversations</Text>
            }
        </Box>
    )
}

export default Convos