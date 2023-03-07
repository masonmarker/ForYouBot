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
const Chat = ({
    messages,
    botmessages,
    setUserMessages,
    setBotMessages,
    conversations,
    setConversations,
    generating,
    setGenerating,
    waiting,
    setWaiting,

    // models
    model,
    setModel
}) => {
    return (
        <ChatStyled>
            <ChatPanel 
                messages={messages}
                botmessages={botmessages}
                conversations={conversations}
                setConversations={setConversations}
                setUserMessages={setUserMessages}
                setBotMessages={setBotMessages}
                generating={generating}
                setGenerating={setGenerating}
                waiting={waiting}
                setWaiting={setWaiting}

                // models
                model={model}
                setModel={setModel} 
            />
            <InfoPanel />
        </ChatStyled>
    )
}

export default Chat