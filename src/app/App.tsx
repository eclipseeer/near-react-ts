import { useState } from 'react';
import { NearConnector } from '@hot-labs/near-connect';
import { AccountCard } from './AccountCard/AccountCard.tsx';
import x from './manifest.json';

// const logger = {
//   log: (...logs: any[]) => console.log(...logs),
// }
//
// const connector = new NearConnector({
//   network: 'testnet',
//   manifest: x as any,
//   logger,
// });
// console.log(connector);

// const wallet = await connector.wallet();
// console.log(wallet);

// const accs = await wallet.getAccounts();
// console.log(accs);

export const App = () => {
  const [count, _setCount] = useState(0);

  const connect = async () => {
    // await connector.connect();
  };

  return (
    <>
      <h1>Test HOT</h1>
      <div className="card">
        <button onClick={connect}>Connect</button>
        <AccountCard />
      </div>
    </>
  );
};
