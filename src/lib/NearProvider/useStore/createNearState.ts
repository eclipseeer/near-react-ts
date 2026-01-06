/*
appName: 'my-test-app',
selectedNetworkId: 'testnet',
networks: [
  { networkId: 'mainnet', client: mainnetClient, signers: {} },
  {
    networkId: 'testnet',
    client: testnetClient,
    keyServices: [],
    selectedAccount,
    accounts: [],
  },
],
*/

export const createNearState = async (props: any) => {
  const {
    appName,
    selectedNetworkId,
    networks: userNetworks,
  } = await props.createContext();

  // Mock Data
  const accountsMap: any = {
    mainnet: [],
    testnet: [{ accountId: 'eclipseer.testnet' }],
  };

  const networks = userNetworks.map((network: any) => ({
    ...network,
    selectedAccount: accountsMap[network.networkId][0] ?? null,
    accounts: accountsMap[network.networkId],
  }));

  return {
    version: 1,
    appName,
    selectedNetwork: networks.find(
      (n: any) => n.networkId === selectedNetworkId,
    ),
    networks,
  };
};
