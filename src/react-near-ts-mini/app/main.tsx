import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { NearProvider } from '../lib';
import { App } from './App.tsx';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <NearProvider networkId="testnet">
    <MantineProvider>
      <App />
    </MantineProvider>
  </NearProvider>,
);
