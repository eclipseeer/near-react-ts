import { isNatError } from 'near-api-ts';
import { useMutation } from '@tanstack/react-query';
import { useStoreState } from '../../../react-store-ts';
import type { TransactionIntent } from '../../../../../near-ts/packages/near-api-ts/dist/node';

type ExecuteTxArgs = {
  intent: TransactionIntent;
  query?: {
    invalidateKeys?: string[];
  };
};

async function executeWithFallback({
  intent,
  accountSigners,
}: {
  intent: TransactionIntent;
  accountSigners: any[] | undefined;
}) {
  if (!accountSigners?.length) {
    throw new Error('No signers found');
  }

  for (let i = 0; i < accountSigners.length; i++) {
    const signer = accountSigners[i];
    if (!signer) continue;

    const result = await signer.safeExecuteTransaction({ intent });
    console.log('result', result);
    if (result.ok) return result.value;

    if (
      isNatError(
        result.error,
        'MemorySigner.ExecuteTransaction.KeyPool.SigningKey.NotFound',
      )
    ) {
      continue;
    }

    throw result.error;
  }

  throw new Error('No usable signer found');
}

export function useExecuteTransaction() {
  const connectedAccountId = useStoreState((s: any) => s.connectedAccountId);
  const accountSigners = useStoreState(
    (s: any) => s.signers[connectedAccountId],
    [connectedAccountId],
  );

  return useMutation({
    mutationKey: ['executeTransaction', connectedAccountId],

    mutationFn: ({ intent }: ExecuteTxArgs) =>
      executeWithFallback({ intent, accountSigners }),

    onSuccess: (_, variables, ___, context) => {
      if (variables?.query?.invalidateKeys) {
        void context.client.invalidateQueries({
          queryKey: variables.query.invalidateKeys,
        });
      }
    },
  });
}
