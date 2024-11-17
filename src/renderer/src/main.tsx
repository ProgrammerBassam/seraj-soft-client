import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/index.css';
import AppTheme from './components/Dashboard/theme/AppTheme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppTheme>
      <CssBaseline enableColorScheme />
      <App />
    </AppTheme>,
  </React.StrictMode>
)
