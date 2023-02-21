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
    useColorMode,
    useToast,
    Text,
    Box,
    HStack,
    VStack,
    Button
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
`

// Message component
// props : date
//       : from
//       : message
//       : messageID
const Message = (props) => {

    // grab current color mode
    const { colorMode } = useColorMode()

    // if something is copied, show toast
    const toast = useToast()

    return (
        <MessageStyled
            borderColor={colorMode === "light" ? colors.darkGray : colors.lightGray}
            _hover={{
                backgroundColor: colorMode === "light" ? colors.gray : "#4B4D52",
                cursor: "pointer",
            }}
            onMouseDown={() => {
                document.getElementById(props.messageID).style.backgroundColor = colorMode === "light" ? colors.darkGray : colors.lightGray
            }}

            
        >
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
                <Button
                    size="sm"
                    className="copy"
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

            </HStack>
        </MessageStyled>
    )
}

export default Message