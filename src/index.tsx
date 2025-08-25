import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AlertProvider } from './context/AlertContext'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL ||
    'https://your-convex-deployment.convex.cloud',
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ConvexProvider>
  </React.StrictMode>,
)
