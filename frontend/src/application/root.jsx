import React, { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import { AuthProvider } from './providers/auth-provider';
import { ThemeProvider } from './providers/theme-provider/index';
import './styles/style.css';
import { SettingsProvider } from './../widgets/theme-settings/context/settings-provider';
import { defaultSettings } from './../widgets/theme-settings/config-settings'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <SettingsProvider settings={defaultSettings}>
          <ThemeProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ThemeProvider>
        </SettingsProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
)
