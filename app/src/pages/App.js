/**
 * Main App component
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */


// components
import SidePanel from '../components/SidePanel'
import Prompt from '../components/Prompt'
import ColorButton from '../components/ColorButton'
import SettingsPanel from '../components/SettingsPanel'
import Chat from '../components/Chat'

// Chakra components
import {
  ChakraProvider,

  Box,
  Text,
  Input
} from "@chakra-ui/react"

// styled components
import styled from 'styled-components'

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

`

// App component
function App() {
  return (
    <ChakraProvider>
      <AppStyled>
        <SidePanel />
        <ColorButton />
        <Prompt />
        <SettingsPanel />
        <Chat />
      </AppStyled>
    </ChakraProvider>
  );
}

export default App;
