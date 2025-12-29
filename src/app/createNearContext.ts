import { createMainnetClient, createTestnetClient } from 'near-api-ts';

export const createNearContext = async () => {
  const mainnetClient = await createMainnetClient();
  const testnetClient = await createTestnetClient();

  return {
    appName: 'my-test-app',
    selectedNetworkId: 'testnet',
    networks: [
      { networkId: 'mainnet', client: mainnetClient, signers: {} },
      { networkId: 'testnet', client: testnetClient, signers: {} },
    ],
  };
};
