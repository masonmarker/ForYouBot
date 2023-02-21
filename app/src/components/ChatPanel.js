/**
 * ChatPanel: Displays the chat history of the current thread.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */

// Chakra components
import {
    useColorMode
} from "@chakra-ui/react"

// styled components
import styled from 'styled-components'

// styled ChatPanel
// should exist in the center of the screen
// vertically and horizontally
// include all props
const ChatPanelStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: 65vh;
    zindex: -1;
    background-color: ${props => props.backgroundColor};
`

// ChatPanel component
const ChatPanel = () => {

    // grab current color mode
    const { colorMode } = useColorMode()

    const ChatPanelStyled = styled.div`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90vw;
        height: 65vh;
        zindex: -1;
        background-color: ${colorMode === "light" ? "#E2E8F0" : "white"};
`

    return (
        <ChatPanelStyled >

        </ChatPanelStyled>
    )
}

export default ChatPanel