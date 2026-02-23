import { useStoreState } from '../../../react-store-ts';

export const useConnectedAccount = () => {
  const connectedAccountId = useStoreState(
    (store: any) => store.connectedAccountId,
  );
  return {
    connectedAccountId,
    isConnectedAccount: typeof connectedAccountId === 'string',
  };
};
