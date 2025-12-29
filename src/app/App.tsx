import { useState } from 'react';
import { NearConnector } from '@hot-labs/near-connect';
import { AccountCard } from './AccountCard/AccountCard.tsx';
import x from './manifest.json';
import styles from './App.module.css';
import { SelectNetwork } from './SelectNetwork/SelectNetwork.tsx';

const logger = {
  log: (...logs: any[]) => console.log(...logs),
};

const connector = new NearConnector({
  network: 'testnet',
  // manifest: x as any,
  logger,
});
console.log(connector);

// const wallet = await connector.wallet();
// console.log(wallet);

// const accs = await wallet.getAccounts();
// console.log(accs);

export const App = () => {
  const [count, _setCount] = useState(0);

  const connect = async () => {
    await connector.connect();
  };

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <h2>near-react-ts</h2>
        <div className={styles.leftSide}>
          <button onClick={connect}>Connect</button>
          <SelectNetwork />
        </div>
      </div>

      <div className="card">
        <AccountCard />
      </div>
    </div>
  );
};
