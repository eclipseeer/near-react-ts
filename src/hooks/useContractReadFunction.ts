import { useQuery } from '@tanstack/react-query';
import { type AccountId } from 'near-api-ts';
import { useNearStore } from '../store/NearStoreProvider.tsx';

type UseContractReadFunctionArgs = {
  contractAccountId: AccountId;
  functionName: string;
  functionArgs?: any; // TODO Fix type
  query?: {
    enabled?: boolean;
  };
};

export const useContractReadFunction = (args: UseContractReadFunctionArgs) => {
  const getContext = useNearStore((store) => store.getContext);
  const context = getContext();

  return useQuery({
    enabled: args.query?.enabled ?? true,
    queryKey: [
      'callContractReadFunction',
      args.contractAccountId,
      args.functionName,
    ],
    queryFn: (queryArgs) =>
      context.client.callContractReadFunction({
        contractAccountId: args.contractAccountId,
        functionName: args.functionName,
        functionArgs: args.functionArgs,
        options: { signal: queryArgs.signal },
      }),
  });
};
