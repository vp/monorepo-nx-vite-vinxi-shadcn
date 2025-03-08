import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@workspace/ui/globals.css';
import App from './app'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
