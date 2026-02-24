import { useQuery, skipToken } from '@tanstack/react-query';
import {
  type GetAccountInfoOutput,
  type GetAccountInfoError,
  type AccountId,
  type Client,
} from 'near-api-ts';
import { useStoreState } from '../../../react-store-ts';

type UseAccountInfoArgs = {
  accountId?: AccountId;
};

export const useAccountInfo = ({ accountId }: UseAccountInfoArgs) => {
  const client: Client = useStoreState((store: any) => store.client, []);

  return useQuery<GetAccountInfoOutput, GetAccountInfoError>({
    queryKey: ['accountInfo', accountId],
    queryFn: accountId
      ? (args) =>
          client.getAccountInfo({
            accountId,
            options: { signal: args.signal },
          })
      : skipToken,
  });
};
