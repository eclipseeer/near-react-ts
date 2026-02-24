import { useEffect, useState } from 'react';
import type { Client } from 'near-api-ts';
import { useStoreEntity, useStoreState } from '../../../react-store-ts';

type UseAccountInfoArgs = {
  accountId: string;
};

export const useAccountInfo = ({ accountId }: UseAccountInfoArgs) => {
  const selectedNetworkId = useStoreState(
    (s: any) => s.selectedNetwork.networkId,
  );
  const client: Client = useStoreState((store: any) => store.selectedNetwork.client);

  const [state, setState] = useState<any>({
    data: null,
    error: null,
    isPending: true,
    isFetching: false,
    isSuccess: false,
    isError: false,
  });

  useEffect(() => {
    if (!accountId)
      return setState({
        data: null,
        error: 'Invalid account id',
        isPending: false,
        isFetching: false,
        isSuccess: false,
        isError: true,
      });

    setState((prev: any) => ({ ...prev, isFetching: true }));
    const controller = new AbortController();

    const fetchData = async () => {
      const response = await client.safeGetAccountInfo({
        accountId,
        options: { signal: controller.signal },
      });

      if (response.ok) {
        return setState({
          data: response.value,
          error: null,
          isPending: false,
          isFetching: false,
          isSuccess: true,
          isError: false,
        });
      }
      console.log(response.error);
      // When unmount -  don't do anything
      // if (
      //   response.error.kind === 'Client.GetAccountInfo.SendRequest.Failed' &&
      //   response.error.context.cause.kind ===
      //     'Client.Transport.SendRequest.Request.Aborted'
      // )
      //   return;

      // When error
      setState({
        data: null,
        error: response.error,
        isPending: false,
        isFetching: false,
        isSuccess: false,
        isError: true,
      });
    };

    void fetchData();

    return () => {
      console.log('Unmount');
      controller.abort(); // Cancel request when unmount
    };
  }, [accountId, selectedNetworkId]);

  return state;
};
