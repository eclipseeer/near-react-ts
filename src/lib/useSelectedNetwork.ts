import { useNearContext } from './NearProvider/NearProvider.tsx';
import { useEffect, useState } from 'react';

export const useSelectedNetwork = () => {
  const [state, setState] = useState<any>({
    selectedNetworkId: undefined,
    networkIds: undefined,
    selectNetwork: undefined,
    ok: false,
  });
  const nearContext = useNearContext();

  useEffect(() => {
    if (!nearContext.ok) return;

    // TODO use memo??
    //  const { client } = nearContext.data.nearState.selectedNetwork;

    const { networks, selectedNetwork } = nearContext.data.nearState;
    const networkIds = networks.map((network: any) => network.networkId);

    const selectNetwork = (networkId: string) =>
      nearContext.data.setStore((prev: any) => ({
        ...prev,
        data: {
          ...prev.data,
          nearState: {
            ...prev.data.nearState,
            selectedNetwork: networks.find(
              (n: any) => n.networkId === networkId,
            ),
          },
        },
      }));

    setState({
      selectedNetworkId: selectedNetwork.networkId,
      networkIds,
      selectNetwork,
      ok: true,
    });
  }, [nearContext]);

  return state;
};
