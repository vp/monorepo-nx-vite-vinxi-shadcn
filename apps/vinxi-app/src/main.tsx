import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@workspace/ui/globals.css';
import App from './app/app';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('TEST', process.env.TEST);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
