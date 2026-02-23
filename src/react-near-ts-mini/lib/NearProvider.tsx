import { createMainnetClient, createTestnetClient } from 'near-api-ts';
import { StoreProvider } from '../../react-store-ts';
import { createNearConnectorService } from './services/nearConnector/createNearConnectorService.ts';
import { createNearStore } from './store/createNearStore.ts';

const createMainnetNearStore = () =>
  createNearStore({
    appName: 'react-near-ts',
    networkId: 'mainnet',
    createClient: createMainnetClient,
    services: [createNearConnectorService({ networkId: 'mainnet' })],
  });

const createTestnetNearStore = () =>
  createNearStore({
    appName: 'react-near-ts',
    networkId: 'testnet',
    createClient: createTestnetClient,
    services: [createNearConnectorService({ networkId: 'testnet' })],
  });

export const NearProvider = ({ networkId, children }: any) => {
  const nearStore =
    networkId === 'mainnet'
      ? createMainnetNearStore()
      : createTestnetNearStore();

  return <StoreProvider store={nearStore}>{children}</StoreProvider>;
};
