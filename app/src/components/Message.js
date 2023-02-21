/**
 * Message box, shows either a user response request or a message from the bot
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// Chakra components
import {
    useColorMode,
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
import { colors, fonts } from '../common/common'

// styled Message
const MessageStyled = styled.div`

    font-family: ${fonts.message};

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid ${props => props.borderColor};

    /* message box */
    .msg {
        width: 100%;
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

    return (
        <MessageStyled borderColor={colorMode === "light" ? colors.darkGray : colors.lightGray}>
            <HStack className="msg">
                <VStack>
                    <HStack>
                        {props.from === "user" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
                        <Text>{props.date}</Text>
                    </HStack>
                    <Text>{props.message}</Text>
                </VStack>

                {/* Copy Button */}
                <HStack>
                    <Button
                        size="sm"
                        className="copy" 
                        backgroundColor={colorMode === "light" ? colors.lightGray : colors.darkGray} 
                    >
                        <CopyIcon />
                    </Button>
                    <Button size="sm" colorScheme="purple">
                        Edit
                    </Button>
                </HStack>

            </HStack>
        </MessageStyled>
    )
}

export default Message