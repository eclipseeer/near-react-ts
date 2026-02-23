import { useStoreEffect } from '../../../react-store-ts';

export const useNearConnector = () => {
  const connectAccountByNearConnector = useStoreEffect(
    (store: any) => store.connectAccountByNearConnector,
  );
  const disconnectAccountByNearConnector = useStoreEffect(
    (store: any) => store.disconnectAccountByNearConnector,
  );

  return {
    connect: connectAccountByNearConnector,
    disconnect: disconnectAccountByNearConnector,
  };
};
