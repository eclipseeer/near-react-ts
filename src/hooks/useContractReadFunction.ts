import { useQuery } from '@tanstack/react-query';
import type {
  UseContractReadFunction,
  InnerUseContractReadFunctionArgs,
} from '../../types/hooks/useContractReadFunction.ts';
import { useNearStore } from '../store/NearStoreProvider.tsx';

export const useContractReadFunction: UseContractReadFunction = (
  args: InnerUseContractReadFunctionArgs,
): ReturnType<UseContractReadFunction> => {
  const getContext = useNearStore((store) => store.getContext);
  const context = getContext();

  const { query, ...callArgs } = args;

  return useQuery({
    enabled: query?.enabled ?? true,
    queryKey: [
      'callContractReadFunction',
      callArgs.contractAccountId,
      callArgs.functionName,
      callArgs.functionArgs,
      callArgs.withStateAt,
      callArgs.policies,
    ],
    queryFn: ({ signal }) =>
      context.client.callContractReadFunction({
        contractAccountId: args.contractAccountId,
        functionName: args.functionName,
        functionArgs: args.functionArgs,
        options: {
          serializeArgs: args.options?.serializeArgs,
          signal,
        },
      }),
  });
};
