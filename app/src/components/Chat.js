/**
 * Main Chat display component
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */


// components
import ChatPanel from './ChatPanel'
import InfoPanel from './InfoPanel'


// styled components
import styled from 'styled-components'

// styled Chat component
const ChatStyled = styled.div`

`

// Chat component
const Chat = ({ messages, botmessages}) => {
    return (
        <ChatStyled>
            <ChatPanel messages={messages} botmessages = {botmessages}/>
            <InfoPanel />
        </ChatStyled>
    )
}

export default Chat