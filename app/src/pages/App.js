/**
 * Main App component
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */


// components
import SidePanel from '../components/SidePanel'

// Chakra components
import {
  ChakraProvider,

  Box,
  Text
} from "@chakra-ui/react"

// styled components
import styled from 'styled-components'

// styled App
const AppStyled = styled.div`

`

// App component
function App() {
  return (
    <ChakraProvider>
      <AppStyled>
        <SidePanel />
      </AppStyled>
    </ChakraProvider>
  );
}

export default App;
