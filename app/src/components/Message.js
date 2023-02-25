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

    // Fading
    ScaleFade,

} from "@chakra-ui/react"

// intersection observer
import { useInView } from 'react-intersection-observer';

// Chakra icons
import {
    CopyIcon,
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
    /*border-top: 1px solid ${props => props.borderColor};*/
    transition: ${css.transition};

    /* message box */
    .msg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100vw;
    }

    .msg-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    /* message text style, should wrap on overflow*/
    .msg-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        word-wrap: break-word;
        
    }

    .icon-text {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;
    }

    .msg-pre-text {
        font-family: ${fonts.message};
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

    // state for displaying the copy button
    const [showCopy, setShowCopy] = useState(false)

    // fading
    const { ref, inView } = useInView({
        threshold: 0,
    })

    return (
        <ScaleFade ref={ref} in={inView}>
            <MessageStyled
                borderColor={colorMode === "light" ? colors.darkGray : colors.lightGray}
                _hover={{
                    backgroundColor: colorMode === "light" ? colors.gray : "#4B4D52",
                    cursor: "pointer",
                }}

                // states for displaying the copy button
                onMouseOver={() => setShowCopy(true)}
                onMouseLeave={() => setShowCopy(false)}

                backgroundColor={props.from !== "user" ? colorMode === "light" ? colors.gray : "gray.700" : "transparent"}

                // open message information on click, but don't
                // open if text is highlighted
                onClick={() => {
                    if (window.getSelection().toString() === "") {
                        onOpen()
                    }
                }}
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
                            <Text>{props.date}</Text>
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

                {/* message box */}
                {showCopy && <HStack marginBottom="0.5rem">
                    {/* edit message button */}
                    <Button
                        size="sm"
                        zIndex={100}
                        backgroundColor="transparent"
                        onClick={(e) => {
                            onOpen()
                            e.stopPropagation()
                        }}
                    >
                        Edit
                    </Button>
                    <CopyButton message={props.message} />

                </HStack>}
                <Text className="msg-text"><pre
                    className="msg-pre-text"
                >{props.message}</pre></Text>
            </MessageStyled>
        </ScaleFade>
    )
}

// copy button
const CopyButton = (props) => {

    // if something is copied, show toast
    const toast = useToast()

    // ScaleFade
    const { ref, inView } = useInView({
        threshold: 0,
    })

    return (
        <ScaleFade ref={ref} in={inView}>
            <Button
                size="sm"
                zIndex={100}
                backgroundColor="transparent"
                onClick={(e) => {
                    navigator.clipboard.writeText(props.message)
                    toast({
                        title: "Copied",
                        description: "Message copied to clipboard",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                    })
                    e.stopPropagation()
                }}
            >
                <CopyIcon />
            </Button>
        </ScaleFade>

    )
}

export default Message