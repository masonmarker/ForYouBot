import logo from './logo.svg';
import './App.css';


// Chakra components
import { 
  ChakraProvider,

  Box, 
  Text
} from "@chakra-ui/react"


function App() {
  return (
    <ChakraProvider>
      <Box>
        <Text>Harrisonbburg</Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
