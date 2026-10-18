import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { TransitionProvider } from './context/TransitionContext';
import './styles/main.css';
import './styles/components.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <TransitionProvider>
            <App />
          </TransitionProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
