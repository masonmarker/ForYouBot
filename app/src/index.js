import React from 'react';
import ReactDOM from 'react-dom/client';

// Pages
import App from './App';


// Chakra UI
import { ChakraProvider } from '@chakra-ui/react';


// Routing
import { 
  BrowserRouter as Router,
  Routes,
  Route
  
} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </ChakraProvider>
);