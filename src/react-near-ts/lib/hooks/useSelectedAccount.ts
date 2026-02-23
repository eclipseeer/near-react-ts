import { useStoreEffect, useStoreState } from '../../../react-store-ts';

export const useSelectedAccount = () => {
  const selectedAccountId = useStoreState(
    (store: any) => store.selectedAccount.accountId,
  );
  const accounts = useStoreState((store: any) => store.addedAccounts);
  const selectAccount = useStoreEffect((store: any) => store.selectAccount);

  const accountIds = accounts.map((account: any) => account.accountId);

  return { selectedAccountId, accountIds, selectAccount };
};
