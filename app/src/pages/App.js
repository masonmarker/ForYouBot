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
import { useMessages } from '../messages/messages'
import { useRef } from 'react'

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
  const { messages, stateAddMessage } = useMessages()

  return (
    <ChakraProvider>
      <Fade in={inView} ref={ref}>
        <AppStyled>
          <Prompt
            messages={messages} 
            stateAddMessage={stateAddMessage}
          />
          <Chat messages={messages} />
        </AppStyled>
      </Fade>
    </ChakraProvider>
  );
}

export default App;
