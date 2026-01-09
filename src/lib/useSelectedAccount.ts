import { useStoreAction, useStoreState } from '../react-store-ts';

export const useSelectedAccount = () => {
  const selectedAccountId = useStoreState(
    (store: any) => store.selectedAccountId,
  );
  const accountIds = useStoreState((store: any) => store.accounts.list);
  const selectAccount = useStoreAction((store: any) => store.selectAccount);

  return { selectedAccountId, accountIds, selectAccount };
};
