import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './Components/HomePage'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
