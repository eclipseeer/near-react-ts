// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { NearStoreProvider } from '../lib/NearStoreProvider.tsx';
import { MantineProvider } from '@mantine/core';
import { createNearStore } from '../lib/createNearStore.ts';
import { createMainnetClient, createTestnetClient } from '../lib';
import '@mantine/core/styles.css';

const nearStore = await createNearStore({
  appName: 'my-test-app',
  selectedNetworkId: 'testnet',
  networks: [
    {
      networkId: 'mainnet',
      client: createMainnetClient(),
    },
    {
      networkId: 'testnet',
      client: createTestnetClient(),
    },
  ],
});

createRoot(document.getElementById('root')!).render(
  <NearStoreProvider nearStore={nearStore}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </NearStoreProvider>,
);
