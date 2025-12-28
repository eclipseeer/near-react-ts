import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { NearProvider } from '../lib/NearProvider.tsx';
import { createNearContext } from './createNearContext.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NearProvider createContext={createNearContext}>
      <App />
    </NearProvider>
  </StrictMode>,
);
