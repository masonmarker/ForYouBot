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
const Chat = ({ messages, botmessages, setUserMessages, setbotMessages, conversations, setConversations}) => {
    return (
        <ChatStyled>
            <ChatPanel 
                messages={messages} 
                botmessages = {botmessages}
                conversations={conversations}   
                setConversations={setConversations}
                setUserMessages={setUserMessages}
                setbotMessages={setbotMessages}
            />
            <InfoPanel />
        </ChatStyled>
    )
}

export default Chat