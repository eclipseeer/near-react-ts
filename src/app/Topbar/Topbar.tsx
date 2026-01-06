import { SelectedAccount } from './SelectedAccount/SelectedAccount.tsx';
import { Button, Title } from '@mantine/core';
import { useSelectedAccount } from '../../lib/useSelectedAccount.ts';
import { SelectNetwork } from './SelectNetwork/SelectNetwork.tsx';
import cn from './Topbar.module.css';

export const Topbar = () => {
  const { selectedAccountId } = useSelectedAccount();

  return (
    <div className={cn.topbar}>
      <Title order={3}>Near React TS</Title>
      <div className={cn.leftSide}>
        {selectedAccountId ? (
          <SelectedAccount />
        ) : (
          <Button onClick={() => {}}>Connect</Button>
        )}
        <SelectNetwork />
      </div>
    </div>
  );
};
