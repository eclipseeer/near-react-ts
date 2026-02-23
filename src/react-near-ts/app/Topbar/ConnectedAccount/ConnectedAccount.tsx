import { useSelectedAccount } from '../../../lib/hooks/useSelectedAccount.ts';
import { Select } from '@mantine/core';

export const ConnectedAccount = () => {
  const { selectedAccountId, accountIds, selectAccount } = useSelectedAccount();

  return (
    <div>
      <Select
        value={selectedAccountId}
        onChange={(value) => selectAccount({ accountId: value })}
        data={accountIds}
        checkIconPosition="right"
      />
    </div>
  );
};
