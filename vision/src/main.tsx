import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Detect from './components/Detect';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Detect />
  </StrictMode>,
);
