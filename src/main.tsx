import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.tsx'
import PreferencesProvider from './context/PreferencesProvider.tsx'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </PreferencesProvider>
  </StrictMode>,
)
