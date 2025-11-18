import React from 'react';
import ReactDOM from 'react-dom/client';
// We use BrowserRouter for routing, which satisfies the "reload on any route" requirement
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);