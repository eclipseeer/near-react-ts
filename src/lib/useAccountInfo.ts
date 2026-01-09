import { useEffect, useState } from 'react';
import type { Client } from 'near-api-ts';
import { useStoreEntity, useStoreState } from '../react-store-ts';

type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

type ExtractOk<R> = R extends Result<infer T, any> ? T : never;
type ExtractErr<R> = R extends Result<any, infer E> ? E : never;

type MyResult = Awaited<ReturnType<Client['safeGetAccountInfo']>>;

// TODO remove it after export types from NAT
type GetAccountInfoOutput = ExtractOk<MyResult>; // GetAccountInfoOutput
type GetAccountInfoError = ExtractErr<MyResult>; // GetAccountInfoError

type UseAccountInfoOutput =
  | {
      data: GetAccountInfoOutput;
      error: null;
      isPending: false;
      isFetching: false;
      isSuccess: true;
      isError: false;
    }
  | {
      data: null;
      error: GetAccountInfoError;
      isPending: false;
      isFetching: false;
      isSuccess: false;
      isError: true;
    }
  | {
      data: null;
      error: null;
      isPending: boolean;
      isFetching: boolean;
      isSuccess: boolean;
      isError: boolean;
    };

type UseAccountInfoArgs = {
  accountId: string;
};

export const useAccountInfo = ({ accountId }: UseAccountInfoArgs) => {
  const selectedNetworkId = useStoreState((s: any) => s.selectedNetworkId);
  const client = useStoreEntity(
    (store: any) => store.networks.map[selectedNetworkId].client,
  );

  const [state, setState] = useState<UseAccountInfoOutput>({
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

    setState((prev) => ({ ...prev, isFetching: true }) as UseAccountInfoOutput);
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
      if (
        response.error.kind === 'Client.GetAccountInfo.SendRequest.Failed' &&
        response.error.context.cause.kind ===
          'Client.Transport.SendRequest.Request.Aborted'
      )
        return;

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
