import { useNearContext } from './NearProvider.tsx';
import { useEffect, useState } from 'react';

export const useSelectedNetwork = () => {
  const [state, setState] = useState<any>({
    data: {
      selectedNetworkId: undefined,
      networkIds: undefined,
      selectNetwork: undefined,
    },
    ok: false,
  });
  const nearContext = useNearContext();

  useEffect(() => {
    if (!nearContext.ok) return;

    // TODO use memo??
    const { selectedNetworkId, networks } = nearContext.context;
    const networkIds = networks.map((network: any) => network.networkId);

    const selectNetwork = (networkId: string) =>
      nearContext.setState((prev: any) => ({
        ...prev,
        context: { ...prev.context, selectedNetworkId: networkId },
      }));

    setState({
      data: {
        selectedNetworkId,
        networkIds,
        selectNetwork,
      },
      ok: true,
    });
  }, [nearContext]);

  return state;
};
