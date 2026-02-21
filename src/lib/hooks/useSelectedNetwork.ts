import { useStoreState, useStoreEffect } from '../../react-store-ts';

export const useSelectedNetwork = () => {
  const selectedNetworkId = useStoreState(
    (store: any) => store.selectedNetwork.networkId,
  );
  // console.log(selectedNetworkId);

  const networkIds = useStoreState((store: any) => store.networkIds);
  const selectNetwork = useStoreEffect((store: any) => store.selectNetwork);

  return { selectedNetworkId, networkIds, selectNetwork };
};
