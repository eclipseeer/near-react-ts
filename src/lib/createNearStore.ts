import { action, createStore, entity } from '../react-store-ts';

/*
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
    },
  ],
});

 */
// TODO rework and make it sync
export const createNearStore = async (config: any) => {
  const { appName, selectedNetworkId, networks: configNetworks } = config;

  const store = createStore({
    // state
    version: 1,
    appName,
    selectedNetworkId,
    networks: {
      list: ['mainnet', 'testnet'],
      map: {
        mainnet: {
          selectedAccountId: undefined,
          accounts: { list: [] },
          client: entity(configNetworks[0].client),
        },
        testnet: {
          selectedAccountId: 'eclipseer.testnet',
          accounts: { list: ['eclipseer.testnet', 'lantstool.testnet'] },
          client: entity(configNetworks[1].client),
        },
      },
    },
    selectedAccountId: 'eclipseer.testnet',
    accounts: { list: ['eclipseer.testnet', 'lantstool.testnet'] },
    // actions
    selectNetwork: action(({ slice, payload }: any) => {
      slice.selectedNetworkId = payload.networkId;
      slice.selectedAccountId =
        slice.networks.map[payload.networkId].selectedAccountId;
      slice.accounts.list = slice.networks.map[payload.networkId].accounts.list;
    }),
    selectAccount: action(({ slice, payload }: any) => {
      slice.selectedAccountId = payload.accountId;
      slice.networks.map[slice.selectedNetworkId].selectedAccountId =
        payload.accountId;
    }),
  });

  const [, createTestnetClient] = store.entities.useSelector(
    (store: any) => store.networks.map.testnet.client,
  );
  const [, createMainnetClient] = store.entities.useSelector(
    (store: any) => store.networks.map.mainnet.client,
  );

  await createTestnetClient();
  await createMainnetClient();

  return store;
};
