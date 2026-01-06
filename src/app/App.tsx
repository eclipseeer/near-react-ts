import { useState } from 'react';
import { NearConnector } from '@hot-labs/near-connect';
import { AccountCard } from './Main/AccountCard/AccountCard.tsx';
import x from './manifest.json';
import styles from './App.module.css';
import { SelectNetwork } from './Topbar/SelectNetwork/SelectNetwork.tsx';
import { useSelectedAccount } from '../lib/useSelectedAccount.ts';
import { SelectedAccount } from './Topbar/SelectedAccount/SelectedAccount.tsx';
import { Button, Tabs } from '@mantine/core';
import { Main } from './Main/Main.tsx';
import { Topbar } from './Topbar/Topbar.tsx';

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

export const App = () => {
  return (
    <div className={styles.app}>
      <Topbar />
      <Main />
    </div>
  );
};
