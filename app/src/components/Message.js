/**
 * Message box, shows either a user response request or a message from the bot
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// states
import { useState } from 'react'

// Chakra components
import {

    // general
    useColorMode,
    useToast,
    Text,
    Box,
    HStack,
    VStack,
    Button,

    // modal for viewing more information about the message
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,

} from "@chakra-ui/react"

// Chakra icons
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    CopyIcon
} from '@chakra-ui/icons'

// styled components
import styled from 'styled-components'

// import common
import { colors, fonts, css } from '../common/common'

// styled Message
const MessageStyled = styled(Box)`

    font-family: ${fonts.message};

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid ${props => props.borderColor};
    transition: ${css.transition};

    /* message box */
    .msg {
        width: 100%;
        height: 100%;
        justify-content: space-between;
    }

    .msg-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }


`

// Message component
// props : date
//       : from
//       : message
//       : messageID
const Message = (props) => {

    // grab current color mode
    const { colorMode } = useColorMode()

    // modal for editing a message
    const { isOpen, onOpen, onClose } = useDisclosure()

    // if something is copied, show toast
    const toast = useToast()


    return (
        <MessageStyled
            borderColor={colorMode === "light" ? colors.darkGray : colors.lightGray}
            _hover={{
                backgroundColor: colorMode === "light" ? colors.gray : "#4B4D52",
                cursor: "pointer",
            }}

            // open modal on click
            onClick={onOpen}
        >

            {/* modal for editing a message */}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>Message</ModalHeader>
                    <ModalBody>
                        <Text>{props.message}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <HStack className="msg-footer">
                            <CopyButton message={props.message} />
                            <Button colorScheme='purple' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost' onClick={onOpen}>
                                Help
                            </Button>
                        </HStack>

                    </ModalFooter>
                </ModalContent>
            </Modal>


            <HStack
                className="msg"
            >
                <VStack>
                    <HStack>
                        {props.from === "user" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
                        <Text>{props.date}</Text>
                    </HStack>
                    <Text>{props.message}</Text>
                </VStack>

                {/* Copy Button */}
                <CopyButton message={props.message} />

            </HStack>
        </MessageStyled>
    )
}

// copy button
const CopyButton = (props) => {

    // if something is copied, show toast
    const toast = useToast()

    return (
        <Button
            size="sm"
            zIndex={`100`}
            backgroundColor="transparent"
            onClick={() => {
                navigator.clipboard.writeText(props.message)
                toast({
                    title: "Copied",
                    description: "Message copied to clipboard",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            }}
        >
            <CopyIcon />
        </Button>

    )
}

export default Message