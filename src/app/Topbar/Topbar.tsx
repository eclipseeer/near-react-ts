import { SelectedAccount } from './SelectedAccount/SelectedAccount.tsx';
import { Button, Title } from '@mantine/core';
import { useSelectedAccount } from '../../lib/hooks/useSelectedAccount.ts';
import { SelectNetwork } from './SelectNetwork/SelectNetwork.tsx';
import cn from './Topbar.module.css';
import styles from '../App.module.css';
import { Main } from '../Main/Main.tsx';
import { NearConnector } from '@hot-labs/near-connect';


export const Topbar = () => {
  const { selectedAccountId } = useSelectedAccount();

  return (
    <div className={cn.topbar}>
      <Title order={3}>Near React TS</Title>
      <div className={cn.leftSide}>
        {selectedAccountId ? (
          <SelectedAccount />
        ) : (
          <>
            <Button>Connect Wallet</Button>
            {/*<Button onClick={check}>Check</Button>*/}
          </>
        )}
        <SelectNetwork />
      </div>
    </div>
  );
};
