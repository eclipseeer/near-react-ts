// selectedNetwork + selectedAccount + signer (automatically)
import { useStoreState } from '../../react-store-ts';
import { useCallback, useState } from 'react';
import { isNatError } from 'near-api-ts';

const executeTransaction = async ({ intent, signers, setState }: any) => {
  const execute = async (index: any) => {
    const signer = signers[index];
    console.log('executeTransaction signer', signer);
    if (!signer)
      return setState({
        data: null,
        error: 'No signers found',
        isLoading: false,
        isSuccess: false,
        isError: true,
      });

    setState((prev: any) => ({ ...prev, isLoading: true }));
    const result = await signer.safeExecuteTransaction({ intent });

    console.log('result', result);

    if (result.ok)
      return setState({
        data: result.value,
        error: null,
        isLoading: false,
        isSuccess: true,
        isError: false,
      });

    if (
      // TODO add .canExecuteTransaction method for signer and filter by it
      isNatError(
        result.error,
        'MemorySigner.ExecuteTransaction.KeyForTaskNotFound',
      )
    ) {
      return await execute(index + 1);
    }

    setState({
      data: null,
      error: result.error,
      isLoading: false,
      isSuccess: false,
      isError: true,
    });
  };

  await execute(0);
};

export const useExecuteTransaction = () => {
  const signers = useStoreState((store: any) => store.selectedAccount.signers);

  const [state, setState] = useState<any>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const executeTransactionCallback = useCallback(
    ({ intent }: any) => executeTransaction({ intent, signers, setState }),
    [signers],
  );

  return { ...state, executeTransaction: executeTransactionCallback };
};
