import { useStoreState, useStoreAction } from '../react-store-ts';

export const useSelectedNetwork = () => {
  const selectedNetworkId = useStoreState(
    (store: any) => store.selectedNetworkId,
  );
  const networkIds = useStoreState((store: any) => store.networks.list);
  const selectNetwork = useStoreAction((store: any) => store.selectNetwork);

  return { selectedNetworkId, networkIds, selectNetwork };
};
