import { NearConnector } from '@hot-labs/near-connect';
import { createSafeExecuteTransaction } from './createSafeExecuteTransaction.ts';

const logger = {
  log: (...logs: any[]) => console.log(...logs),
};

export const createNearConnectorService = ({ networkId }: any) => {
  return {
    serviceId: 'nearConnector' as const,
    createService: () => {
      const connector = new NearConnector({
        network: networkId,
        // logger,
      });
      return { connector };
    },
    // args should be general and one for all services; TODO - use better naming
    createSigner: ({ signerAccountId, service }: any) => {
      return {
        safeExecuteTransaction: createSafeExecuteTransaction(service.connector),
      };
    },
  };
};

/*
// const logger = {
//   log: (...logs: any[]) => console.log(...logs),
// };
//
const connector = new NearConnector({
  network: 'testnet',
  logger,
});
console.log(connector);

connector.on('wallet:signIn', async (data) => {
  console.log('wallet:signIn', data);
});

// const check = async () => {
//   try {
//     const wallet = await connector.wallet();
//     console.log('wallet', wallet);
//
//     const accounts = await wallet.getAccounts();
//     console.log('accounts', accounts);
//
//     const tx = await wallet.signAndSendTransaction({
//       signerId: 'lantstool.testnet',
//       actions: [
//         {
//           type: 'Transfer',
//           params: {
//             deposit: '1',
//           },
//         },
//       ],
//       receiverId: 'eclipseer.testnet',
//     });
//
//     console.log(tx);
//   } catch (e) {
//     console.log(e);
//   }
//
// };
 */
