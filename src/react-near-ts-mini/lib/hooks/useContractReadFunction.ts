import { useQuery } from '@tanstack/react-query';
import { type AccountId, type Client } from 'near-api-ts';
import { useStoreState } from '../../../react-store-ts';

type UseContractReadFunctionArgs = {
  contractAccountId: AccountId;
  functionName: string;
};

export const useContractReadFunction = (args: UseContractReadFunctionArgs) => {
  const client: Client = useStoreState((store: any) => store.client, []);

  return useQuery({
    queryKey: [
      'callContractReadFunction',
      args.contractAccountId,
      args.functionName,
    ],
    queryFn: (queryArgs) =>
      client.callContractReadFunction({
        contractAccountId: args.contractAccountId,
        functionName: args.functionName,
        options: { signal: queryArgs.signal },
      }),
  });
};
