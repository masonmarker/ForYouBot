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
    transform: translate(-50%, -52%);
    width: 90vw;
    height: 65vh;
    zindex: -1;
    background-color: ${props => props.backgroundColor};
    border-radius: 1rem;
`

// ChatPanel component
const ChatPanel = () => {

    // grab current color mode
    const { colorMode } = useColorMode()

    return (
        <ChatPanelStyled backgroundColor={colorMode === "light" ? colors.lightGray : "#171923"}>

        </ChatPanelStyled>
    )
}

export default ChatPanel