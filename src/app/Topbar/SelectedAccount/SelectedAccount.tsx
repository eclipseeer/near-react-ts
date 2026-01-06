import { useSelectedAccount } from '../../../lib/useSelectedAccount.ts';
import { Select } from '@mantine/core';

export const SelectedAccount = () => {
  const { selectedAccountId, accountIds, ok } = useSelectedAccount();

  if (!ok) return null;

  return (
    <div>
      <Select
        value={selectedAccountId}
        onChange={() => {}}
        data={accountIds}
        checkIconPosition="right"
      />
    </div>
  );
};
