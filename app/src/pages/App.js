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

// models as appmodels
import models from '../models/models'

// importing empty conversation
import { emptyConversation } from '../messages/messages'

// states
import { useMessages, useConversation } from '../messages/messages'
import { useState, useRef } from 'react'

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

  // state for bot model, using first model in models for now
  const [model, setModel] = useState("davinci")

  // state for all models
  const [allModels, setAllModels] = useState(models)

  // state for bot response contstraints
  const [constraints, setConstraints] = useState([
    // "-don't include you:",
    // "-minimum tokens"
  ])

  // state for app settings accent color
  const [colorScheme, setcolorScheme] = useState("purple");

  // app information / states to pass as props
  var app = {

    // conversations / messages
    userMessages: userMessages,
    stateAddMessage: stateAddMessage,
    stateAddBotMessage: stateAddBotMessage,
    botMessages: botMessages,
    setUserMessages: setUserMessages,
    setBotMessages: setBotMessages,
    conversations: conversations,
    setConversations: setConversations,

    // generating conversation title
    generating: generating,
    setGenerating: setGenerating,

    // waiting for bot response
    waiting: waiting,
    setWaiting: setWaiting,

    // bot information
    model: model,
    setModel: setModel,
    constraints: constraints,
    setConstraints: setConstraints,

    // models
    models: allModels,
    setModels: setAllModels,

    // app settings 
    settings: {
      accent: colorScheme,
      setAccent: setcolorScheme
    },

    // component references
    refs: {
      areaRef: useRef(null),
      submitRef: useRef(null)
    }

  }


  return (
    <ChakraProvider>
      <Fade in={inView} ref={ref}>
        <AppStyled>
          <Prompt app={app} />
          <Chat app={app} />
        </AppStyled>
      </Fade>
    </ChakraProvider>
  );
}

export default App;
