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
import { SettingsDrawer } from './../widgets/theme-settings';
import { QueryClientProvider } from './providers/query-client';
import { CollapseDrawerProvider } from './providers/collapse-drawer-provider';
import { MuiLocalizationProvider } from './providers/mui-localization-provider';
import { NotistackProvider } from './providers/notistack-provider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider>
      <CollapseDrawerProvider>
        <HelmetProvider>
          <MuiLocalizationProvider>
            <AuthProvider>
              <SettingsProvider settings={defaultSettings}>
                <ThemeProvider>
                  <BrowserRouter>
                    <NotistackProvider>
                      <SettingsDrawer/>
                      <Router />
                    </NotistackProvider>
                  </BrowserRouter>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </MuiLocalizationProvider>
        </HelmetProvider>
      </CollapseDrawerProvider>
    </QueryClientProvider>
  </StrictMode>
)
