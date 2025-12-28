import { createMainnetClient, createTestnetClient } from 'near-api-ts';

export const createNearContext = async () => {
  const mainnetClient = await createMainnetClient();
  const testnetClient = await createTestnetClient();

  return {
    networks: {
      mainnet: {
        client: mainnetClient,
        signers: {},
      },
      testnet: {
        client: testnetClient,
        signers: {},
      },
    },
  };
};
