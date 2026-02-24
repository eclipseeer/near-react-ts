import { useCallback, useState } from 'react';
import { type Client } from '../../../../../near-ts/packages/near-api-ts/universal';
import { useStoreState } from '../../../react-store-ts';

const callContractReadFunction = async (
  args: any,
  client: Client,
  setState: any,
) => {
  setState((prev: any) => ({ ...prev, isLoading: true }));
  const result = await client.safeCallContractReadFunction(args);

  console.log('result', result);

  if (result.ok)
    return setState({
      data: result.value,
      error: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

  setState({
    data: null,
    error: result.error,
    isLoading: false,
    isSuccess: false,
    isError: true,
  });
};

export const useContractReadFunction = () => {
  const client: Client = useStoreState((store: any) => store.client);

  const [state, setState] = useState<any>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    callContractReadFunction: () => {},
  });

  const callContractReadFunctionCallback = useCallback(
    (args: any) => callContractReadFunction(args, client, setState),
    [client],
  );

  setState((prev: any) => ({
    ...prev,
    callContractReadFunction: callContractReadFunctionCallback,
  }));

  return state;
};
