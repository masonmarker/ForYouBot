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

// importing empty conversation
import { emptyConversation } from '../messages/messages'

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
  const { conversations, setConversations } = useConversation([
    emptyConversation(userMessages, botMessages)
  ])

  // state for generating
  const [generating, setGenerating] = useState(false)

  // is waiting for response
  const [waiting, setWaiting] = useState(false);

  // state for bot model
  const [model, setModel] = useState("davinci")  

  // state for bot response contstraints
  const [constraints, setConstraints] = useState([
    "- don't include 'ChatGPT:'",
    "- use the least amount of words possible"
  ])

  return (
    <ChakraProvider>
      <Fade in={inView} ref={ref}>
        <AppStyled>
          <Prompt

            // message / conversation states
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

            // constraints
            constraints={constraints}
            setConstraints={setConstraints}

            // model information
            model={model}
            setModel={setModel}
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

            // model information
            model={model}
            setModel={setModel}
          />
        </AppStyled>
      </Fade>
    </ChakraProvider>
  );
}

export default App;
