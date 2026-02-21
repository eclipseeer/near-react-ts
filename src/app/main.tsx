import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { NearStoreProvider } from '../lib/NearStoreProvider.tsx';
import { MantineProvider } from '@mantine/core';
import { createNearStore } from '../lib/store/createNearStore.ts';
import { createMainnetClient, createTestnetClient } from '../lib';
import '@mantine/core/styles.css';
import { createMemoryService } from '../lib/services/memory/createMemoryService.ts';
import { createHotConnectorService } from '../lib/services/hotConnector/createHotConnectorService.ts';

const testnetMemoryService = createMemoryService({
  keySources: [
    // {
    //   privateKey: // nrt-fc.lantstool.testnet - FA
    //     'ed25519:4YaD3FFiwdizkS9fhvK22CvYtse6YUKQisbJ9WRrfKhj6Pn239icTLu63tBvLwRV6jzWTjT45kwB2EbKrqCsYgDL',
    // },
    {
      privateKey: // nrt-fc.lantstool.testnet - FC
        'ed25519:4AbRCfUD8xg9W7jnYc9oHPGwQDGuFrCY7jGkfEo57L28Uz4iawjnzNX7sisjyjXKkcikiA9okyMnvPrhzVs1L3xn',
    },
  ],
});

const testnetHotConnectorService = createHotConnectorService({
  networkId: 'testnet',
});

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
      services: [testnetMemoryService, testnetHotConnectorService],
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
