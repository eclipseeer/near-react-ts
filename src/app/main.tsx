import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { NearProvider } from '../lib/NearProvider/NearProvider.tsx';
import { createNearContext } from './createNearContext.ts';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

// TODO enable <StrictMode> for testing
createRoot(document.getElementById('root')!).render(
  <NearProvider createContext={createNearContext}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </NearProvider>,
);
