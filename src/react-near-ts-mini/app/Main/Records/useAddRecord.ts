import { useExecuteTransaction } from '../../../lib/hooks/useExecuteTransaction.ts';
import { functionCall } from 'near-api-ts';

export const useAddRecord = (setRecordInput: any) => {
  const addRecordMutation = useExecuteTransaction();

  return {
    addRecord: (record: string) => {
      addRecordMutation.mutate(
        {
          intent: {
            action: functionCall({
              functionName: 'add_record',
              functionArgs: { record },
              gasLimit: { teraGas: '10' },
            }),
            receiverAccountId: 'react-near-ts.lantstool.testnet',
          },
          query: {
            invalidateKeys: ['callContractReadFunction'],
          },
        },
        {
          onSuccess: () => setRecordInput(''),
        },
      );
    },
    addRecordMutation,
  };
};
