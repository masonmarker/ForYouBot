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
import { useState } from 'react'

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
    setUserMessages,
    setBotMessages
  } = useMessages()

  // conversations state with initial messages
  const { conversations, setConversations } = useConversation([{
    name: 'New Conversation',
    user: userMessages,
    bot: botMessages 
  }])

  // state for generating
  const [generating, setGenerating] = useState(false)

  // is waiting for response
  const [waiting, setWaiting] = useState(false);

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
            generating={generating}
            setGenerating={setGenerating}
            waiting={waiting}
            setWaiting={setWaiting}
          />
          <Chat 
            messages={userMessages} 
            botmessages={botMessages} 
            setUserMessages={setUserMessages}
            setBotMessages={setBotMessages}
            conversations={conversations} 
            setConversations={setConversations}
            generating={generating}
            setGenerating={setGenerating}
            waiting={waiting}
            setWaiting={setWaiting}
          />
        </AppStyled>
      </Fade>
    </ChakraProvider>
  );
}

export default App;
