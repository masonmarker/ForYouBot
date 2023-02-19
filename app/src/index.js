/**
 * Index file.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';




// routing
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);