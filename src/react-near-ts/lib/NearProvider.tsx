// import { createContext, useContext } from 'react';
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { App } from '../app/App.tsx';
// import { useStore } from './useStore/useStore.ts';
import { StoreProvider } from '../../react-store-ts';
import { createMainnetClient, createTestnetClient } from './index.ts';
import { createHotConnectorService } from './services/hotConnector/createHotConnectorService.ts';
import { createMemoryService } from './services/memory/createMemoryService.ts';
import { createNearStore } from './store/createNearStore.ts';

// const NearContext = createContext<any>(undefined);

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

const nearStore = createNearStore({
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
      services: [testnetMemoryService, /*testnetHotConnectorService*/],
    },
  ],
});

export const NearProvider = ({ networkId, children }: any) => {
  // TODO use networkId for nearStore
  return <StoreProvider store={nearStore()}>{children}</StoreProvider>;
};

// export const useNearContext = () => {
//   const nearContext = useContext(NearContext);
//
//   if (!nearContext)
//     throw new Error('useNearContext must be used within NearProvider.');
//
//   return nearContext;
// };
