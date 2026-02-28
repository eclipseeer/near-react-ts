import { useQuery } from '@tanstack/react-query';
import { type AccountId } from 'near-api-ts';
import { useNearStore } from '../store/NearStoreProvider.tsx';

type UseContractReadFunctionArgs = {
  contractAccountId: AccountId;
  functionName: string;
};

export const useContractReadFunction = (args: UseContractReadFunctionArgs) => {
  const getContext = useNearStore((store) => store.getContext);
  const context = getContext();

  return useQuery({
    queryKey: [
      'callContractReadFunction',
      args.contractAccountId,
      args.functionName,
    ],
    queryFn: (queryArgs) =>
      context.client.callContractReadFunction({
        contractAccountId: args.contractAccountId,
        functionName: args.functionName,
        options: { signal: queryArgs.signal },
      }),
  });
};
