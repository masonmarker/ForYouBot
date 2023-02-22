/**
 * ChatPanel: Displays the chat history of the current thread.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */

// components
import Title from './Title'
import Message from './Message'

// Chakra components
import {
    useColorMode,
    Text,
    Box
} from "@chakra-ui/react"

// styled components
import styled from 'styled-components'

// common 
import { colors } from '../common/common'


// styled ChatPanel
// should exist in the center of the screen
// vertically and horizontally
// include all props
const ChatPanelStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    width: 95vw;
    height: 65vh;
    background-color: ${props => props.backgroundColor};
    border-radius: 1rem;

    .chat {
        height: 90%;
        width: 100%;
        overflow-y: scroll;
    }
`

// ChatPanel component
const ChatPanel = () => {

    // grab current color mode
    const { colorMode } = useColorMode()

    function date() {
        return new Date().toLocaleTimeString()
    }

    const now = new Date().toLocaleTimeString()

    return (
        <ChatPanelStyled backgroundColor={colorMode === "light" ? colors.lightGray : colors.darkGray}>
            <Title />

            {/* Chat History */}
            <Box className="chat">
                <div id="chat">
                    <Message date={now} from="user" message="Hello World" />
                </div>
            </Box>


        </ChatPanelStyled>
    )
}

export default ChatPanel