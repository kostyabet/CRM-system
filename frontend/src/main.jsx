import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MainPage } from './pages/MainPage/MainPage'

console.log(document.getElementById('root'));
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <MainPage />
  </StrictMode>
)
