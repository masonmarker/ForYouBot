/**
 * Conversations panel, grants the ability to switch between conversations
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React, { useState, useRef } from 'react'


// Chakra components
import {
    Box,
    Button,
    HStack,
    VStack,
    Text,
    ScaleFade,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,

    useDisclosure,

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
    onClose1
}) => {

    // use intersection observer
    const [ref, inView] = useInView({
        threshold: 0,
    })

    // are you sure state (conversation removal)
    const [areYouSure, setAreYouSure] = useState(false)

    // renaming index state
    const [renameIndex, setRenameIndex] = useState(null)

    //modal state use disclosure
    const { isOpen, onOpen, onClose } = useDisclosure()

    const renameInput = useRef(null)

    // conversations format:
    // conversations[0].user[0] = {date: from: message:}

    return (
        <Box>
            {conversations[0]
                ? conversations?.map((convo, index) => (
                    <ScaleFade in={inView} ref={ref} key={`convo-${index}`}>
                        <ConvoStyled key={`convo-${index}`}>
                            <Text className="title">{convo.name}</Text>
                            {index === 0 &&
                                <Button
                                    colorScheme="green"
                                    size="xs"
                                    cursor="default"
                                >
                                    Currently Open</Button>
                            }
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
                                    onClose1()
                                }}>
                                    Open
                                </Button>

                                {/* Rename this conversation */}
                                <Button onClick={(e) => {

                                    onOpen()

                                }}> Rename
                                </Button>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>{conversations[index].name}</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Input ref={renameInput} placeholder="New name" />
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button colorScheme="purple" mr={3} onClick={onClose}>
                                                Close
                                            </Button>
                                            <Button variant="ghost" onClick={
                                                () => {
                                                    const newConversations = conversations
                                                    newConversations[index].name = renameInput.current.value
                                                    newConversations[index].wasRenamed = true
                                                    setConversations(newConversations)
                                                    onClose()
                                                }}>Submit</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
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
                                    onClose1()
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