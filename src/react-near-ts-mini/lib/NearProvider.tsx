import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

export const NearProvider = ({ networkId, children }: any) => {
  const nearStore =
    networkId === 'mainnet'
      ? createMainnetNearStore()
      : createTestnetNearStore();

  return (
    <StoreProvider store={nearStore}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StoreProvider>
    // <StoreProvider store={nearStore}>
    //   {children}
    // </StoreProvider>
  );
};
