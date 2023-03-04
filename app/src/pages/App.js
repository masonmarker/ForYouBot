/**
 * Main App component
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */


// components
import Prompt from '../components/Prompt'
import Chat from '../components/Chat'

// states
import { useMessages, useConversation } from '../messages/messages'
import { useEffect, useRef } from 'react'

// Chakra components
import {
  ChakraProvider,
  Fade
} from "@chakra-ui/react"

// intersection observer
import { useInView } from 'react-intersection-observer';

// styled components
import styled from 'styled-components'

// common
import { css } from '../common/common'

// styled App
const AppStyled = styled.div`

  /* put input on the bottom center of the screen */
  .inp {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    margin-bottom: 5rem;
  }

  * {
    transition: ${css.transition};
  }
`

// App component
function App() {

  // fading
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // messages state
  const { 
    
    // messages
    userMessages, 
    stateAddMessage, 
    stateAddBotMessage, 
    botMessages,
  } = useMessages()

  // conversations state with initial messages
  const { conversations, setConversations } = useConversation([{
    name: 'New Conversation',
    user: userMessages,
    bot: botMessages 
  }])

  useEffect(() => {
    setConversations([{
      name: conversations[0].name,
      user: userMessages,
      bot: botMessages
    }])
  })

  return (
    <ChakraProvider>
      <Fade in={inView} ref={ref}>
        <AppStyled>
          <Prompt
            userMessages={userMessages}
            botMessages={botMessages}
            stateAddMessage={stateAddMessage}
            stateAddBotMessage={stateAddBotMessage}
            conversations={conversations}
            setConversations={setConversations}
          />
          <Chat 
            messages={userMessages} 
            botmessages={botMessages} 
            setUserMessages={stateAddMessage}
            setBotMessages={stateAddBotMessage}
            conversations={conversations} 
            setConversations={setConversations}
          />
        </AppStyled>
      </Fade>
    </ChakraProvider>
  );
}

export default App;
