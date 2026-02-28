import { createNearStore } from './store/nearStore.ts';
import { createMainnetClient, createTestnetClient } from 'near-api-ts';
import { createNearConnectorService } from './serviceCreators/nearConnector/createNearConnectorService.ts';
import { NearProvider } from './NearProvider.tsx';

const createTestnetNearStore = () =>
  createNearStore({
    networkId: 'testnet',
    createClient: createTestnetClient,
    serviceCreators: [createNearConnectorService({ networkId: 'testnet' })],
  });

export const TestnetNearProvider = ({ children }: any) => (
  <NearProvider nearStore={createTestnetNearStore()}>{children}</NearProvider>
);

const createMainnetNearStore = () =>
  createNearStore({
    networkId: 'mainnet',
    createClient: createMainnetClient,
    serviceCreators: [createNearConnectorService({ networkId: 'mainnet' })],
  });

export const MainnetNearProvider = ({ children }: any) => (
  <NearProvider nearStore={createMainnetNearStore()}>{children}</NearProvider>
);
