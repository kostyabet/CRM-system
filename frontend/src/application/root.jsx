import React, { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import { AuthProvider } from './providers/auth-provider';
import './styles/style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
)
