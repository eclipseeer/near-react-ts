import { useNearContext } from './NearProvider/NearProvider.tsx';
import { useEffect, useState } from 'react';

export const useSelectedAccount = () => {
  const [state, setState] = useState<any>({
    selectedAccountId: undefined,
    accountIds: undefined,
    // selectNetwork: undefined,
    ok: false,
  });
  const nearContext = useNearContext();

  useEffect(() => {
    if (!nearContext.ok) return;

    // TODO use memo??
    const { selectedAccount, accounts } =
      nearContext.data.nearState.selectedNetwork;

    const accountIds = accounts
      ? accounts.map((account: any) => account.accountId)
      : [];

    // const selectNetwork = (networkId: string) =>
    //   nearContext.data.setStore((prev: any) => ({
    //     ...prev,
    //     data: {
    //       ...prev.data,
    //       nearState: {
    //         ...prev.data.nearState,
    //         selectedNetwork: networks.find(
    //           (n: any) => n.networkId === networkId,
    //         ),
    //       },
    //     },
    //   }));

    setState({
      selectedAccountId: selectedAccount?.accountId,
      accountIds,
      // selectNetwork,
      ok: true,
    });
  }, [nearContext]);

  return state;
};
