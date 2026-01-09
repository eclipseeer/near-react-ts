import { SelectedAccount } from './SelectedAccount/SelectedAccount.tsx';
import { Button, Title } from '@mantine/core';
import { useSelectedAccount } from '../../lib/useSelectedAccount.ts';
import { SelectNetwork } from './SelectNetwork/SelectNetwork.tsx';
import cn from './Topbar.module.css';
import styles from '../App.module.css';
import { Main } from '../Main/Main.tsx';
import { NearConnector } from '@hot-labs/near-connect';

const logger = {
  log: (...logs: any[]) => console.log(...logs),
};

const connector = new NearConnector({
  network: 'testnet',
  // manifest: x as any,
  logger,
});
console.log(connector);

connector.on('wallet:signIn', async (data) => {
  console.log('wallet:signIn', data);
});

// const wallet = await connector.wallet();
// console.log(wallet);

// const accs = await wallet.getAccounts();
// console.log(accs);

/*
const connect = async () => {
    await connector.connect();
  };
 */

export const Topbar = () => {
  const { selectedAccountId } = useSelectedAccount();

  return (
    <div className={cn.topbar}>
      <Title order={3}>Near React TS</Title>
      <div className={cn.leftSide}>
        {selectedAccountId ? (
          <SelectedAccount />
        ) : (
          <Button onClick={() => connector.connect()}>Connect Wallet</Button>
        )}
        <SelectNetwork />
      </div>
    </div>
  );
};
