import type { NearConnector } from '@hot-labs/near-connect';
import type { Client } from 'near-api-ts';
import { action, createStore, effect } from '../../../react-store-ts';
import { loadStateFromLs } from './loadStateFromLs.ts';
import { setStateToLs } from './setStateToLs.ts';

export const createNearStore = (config: any) => {
  const { appName, networkId, createClient } = config;

  const lsState = loadStateFromLs(appName, networkId);
  console.log('lsState', lsState);
  const connectedAccountId = lsState.connectedAccountId;
  const nearConnectorService = config.services[0].createService();
  const signers: any = {};

  if (connectedAccountId) {
    signers[connectedAccountId] = [
      config.services[0].createSigner({
        service: nearConnectorService,
      }),
    ];
  }
  console.log(signers);

  const store = createStore({
    // state
    version: lsState.version,
    appName,
    networkId,
    connectedAccountId,
    client: createClient() as Client,
    services: {
      nearConnector: nearConnectorService.connector,
    },
    signers,

    // Connect an account
    connectAccountByNearConnectorAction: action(({ store, payload }: any) => {
      store.connectedAccountId = payload.connectedAccountId;
      store.signers[payload.connectedAccountId] = [
        config.services[0].createSigner({
          service: nearConnectorService,
        }),
      ];
    }),
    connectAccountByNearConnector: effect(async ({ store }: any) => {
      const networkId = store.getState((store: any) => store.networkId);
      // const nearConnector: NearConnector = store.getState(
      //   (store: any) => store.services.nearConnector,
      // );
      const connectAccountByNearConnectorAction = store.getActions(
        (store: any) => store.connectAccountByNearConnectorAction,
      );
      const nearConnector: NearConnector = nearConnectorService.connector;
      try {
        const wallet = await nearConnector.connect();
        const accounts = await wallet.getAccounts({ network: networkId });
        const connectedAccountId = accounts[0].accountId;

        setStateToLs(
          {
            version: 1,
            connectedAccountId,
          },
          appName,
          networkId,
        );

        connectAccountByNearConnectorAction({ connectedAccountId });
      } catch (e) {
        console.log(e);
        return e;
      }
    }),

    // Disconnect account
    disconnectAccountByNearConnectorAction: action(({ store }: any) => {
      delete store.signers[store.connectedAccountId];
      store.connectedAccountId = null;
    }),
    disconnectAccountByNearConnector: effect(async ({ store }: any) => {
      const networkId = store.getState((store: any) => store.networkId);
      const disconnectAccountByNearConnectorAction = store.getActions(
        (store: any) => store.disconnectAccountByNearConnectorAction,
      );
      const nearConnector: NearConnector = nearConnectorService.connector;

      try {
        await nearConnector.disconnect();

        setStateToLs(
          {
            version: 1,
            connectedAccountId: null,
          },
          appName,
          networkId,
        );

        disconnectAccountByNearConnectorAction();
      } catch (e) {
        console.log(e);
        return e;
      }
    }),
  });

  return store;
};
