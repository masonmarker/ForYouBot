import React from 'react';
import ReactDOM from 'react-dom/client';

// Pages
import App from './App';


// Routing
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';


// Initialize Application
const Init = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </HashRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);