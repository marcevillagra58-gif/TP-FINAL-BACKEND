import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'
import { TransitionProvider } from './components/Transition.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

// HashRouter evita problemas de 404 en GitHub Pages al usar #
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <NotificationProvider>
          <TransitionProvider>
            <App />
          </TransitionProvider>
        </NotificationProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
