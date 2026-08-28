import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
if (!codespaceName) {
  // Informative message for developers; components will fall back to window.origin
  console.info('VITE_CODESPACE_NAME is not set; using local origin for API requests')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
