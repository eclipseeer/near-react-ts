import { NearConnector } from '@hot-labs/near-connect';
import { createSafeExecuteTransaction } from './createSafeExecuteTransaction.ts';

const logger = {
  log: (...logs: any[]) => console.log(...logs),
};

export const createHotConnectorService = ({ networkId }: any) => {
  return {
    serviceId: 'hotConnector' as const,
    createService: async () => {
      const connector = new NearConnector({
        network: networkId,
        // logger,
      });
      return { connector };
    },
    // args should be general and one for all services;
    createSigner: async ({ signerAccountId, service }: any) => {
      // load this from DB
      const connectedAccountIds = ['nrt-fc.lantstool.testnet'];

      if (!connectedAccountIds.includes(signerAccountId))
        throw new Error('Invalid signer account id');

      const wallet = await service.connector.wallet();

      return {
        safeExecuteTransaction: createSafeExecuteTransaction(wallet),
      };
    },
  };
};

/*
// const logger = {
//   log: (...logs: any[]) => console.log(...logs),
// };
//
// const connector = new NearConnector({
//   network: 'testnet',
//   logger,
// });
// console.log(connector);
//
// connector.on('wallet:signIn', async (data) => {
//   console.log('wallet:signIn', data);
// });

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
