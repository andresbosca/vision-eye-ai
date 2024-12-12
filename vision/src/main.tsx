import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Landing from './components/Landing';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
);
