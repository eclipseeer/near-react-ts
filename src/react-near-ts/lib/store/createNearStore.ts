import { action, createStore, effect } from '../../../react-store-ts';

export const createNearStore = (config: any) => {
  const { appName, networks: configNetworks } = config;

  // TODO load data from a persist storage

  const mainnetUserConfig = configNetworks[0];
  const mainnetClient = mainnetUserConfig.client();

  const testnetClient = configNetworks[1].client();

  // const testnetServices = configNetworks[1].services.reduce(
  //   async (acc: any, service: any) => {
  //     acc[service.serviceId] = service.createService();
  //   },
  //   {},
  // );
  // console.log(await testnetServices);

  const testnetMemoryService = configNetworks[1].services
    .find((s: any) => s.serviceId === 'memory')
    ?.createService();

  const testnetHotConnectorService = configNetworks[1].services
    .find((s: any) => s.serviceId === 'hotConnector')
    ?.createService();

  // console.log(testnetMemoryService);
  // console.log(testnetHotConnectorService);

  const store = createStore({
    // state
    version: 1,
    appName,
    selectedNetwork: {
      networkId: 'testnet',
      client: testnetClient,
      services: {
        memory: testnetMemoryService,
        hotConnector: testnetHotConnectorService,
      },
    },
    networkIds: ['mainnet', 'testnet'],
    selectedAccount: {
      accountId: 'nrt-fc.lantstool.testnet',
      signers: configNetworks[1].services.map((service: any) =>
        service.createSigner({
          signerAccountId: 'nrt-fc.lantstool.testnet',
          client: testnetClient,
          service:
            service.serviceId === 'memory'
              ? testnetMemoryService
              : testnetHotConnectorService,
        }),
      ),
    },
    addedAccounts: [
      {
        accountId: 'eclipseer.testnet',
        addedAt: Date.now(),
      },
      {
        accountId: 'nrt-fc.lantstool.testnet',
        addedAt: Date.now(),
      },
    ],

    // actions
    selectNetworkAction: action(({ slice, payload }: any) => {
      slice.selectedNetworkId = payload.networkId;
      slice.selectedAccountId =
        slice.networks.map[payload.networkId].selectedAccountId;
      slice.accounts.list = slice.networks.map[payload.networkId].accounts.list;
    }),
    selectNetwork: effect(async ({ store, payload }: any) => {
      const selectNetworkAction = store.getActions(
        (store: any) => store.selectNetworkAction,
      );
      selectNetworkAction(payload);
    }),

    // Select account

    // load access keys
    // try to create multiple signers for this account
    // if 0 was created - show an error
    // somehow need to block the useExecuteTransaction from be able to call the function if no signers present?

    // when we try to send tx we iterate over all available signers;
    // if a signer can't handle the tx it returns the error .SigningKeys.NotFound
    // if it happened - return an error;
    selectAccountAction: action(({ slice, payload }: any) => {
      slice.selectedAccountId = payload.accountId;
      slice.networks.map[slice.selectedNetworkId].selectedAccountId =
        payload.accountId;
    }),

    // TODO fix slice.getActions - doesn't work
    selectAccount: effect(async ({ store, payload }: any) => {
      const selectAccountAction = store.getActions(
        (store: any) => store.selectAccountAction,
      );
      selectAccountAction(payload);
    }),
  });

  // const [, createTestnetClient] = store.entities.useSelector(
  //   (store: any) => store.networks.map.testnet.client,
  // );
  // const [, createMainnetClient] = store.entities.useSelector(
  //   (store: any) => store.networks.map.mainnet.client,
  // );
  //
  // // TODO Create a MainnetClient only when we switch to the mainnet network;
  // await createTestnetClient();
  // await createMainnetClient();

  return store;
};
