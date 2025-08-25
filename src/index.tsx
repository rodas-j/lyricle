import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { AlertProvider } from './context/AlertContext'
import { initAnalytics } from './lib/analytics'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </React.StrictMode>
)

// Initialize analytics
initAnalytics()
