import { Title, Text, Button } from '@mantine/core';
import cn from './Records.module.css';
import { functionCall } from 'near-api-ts';
import { useContractReadFunction } from '../../../lib/hooks/useContractReadFunction.ts';
import { useExecuteTransaction } from '../../../lib/hooks/useExecuteTransaction.ts';

export const Records = () => {
  const records = useContractReadFunction({
    contractAccountId: 'react-near-ts.lantstool.testnet',
    functionName: 'get_records',
  });

  const addRecordMutation = useExecuteTransaction();

  const addRecord = (record: string) => {
    addRecordMutation.mutate({
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
    });
  };

  if (records.isPending) return <Text>Loading...</Text>;

  if (records.isError)
    return <Text>Error during calling the get_records method...</Text>;

  return (
    <>
      <Title order={3}>Records</Title>
      <div className={cn.info}>
        {(records.data.result as any).map((record: string, index: number) => (
          <Text key={`${record}-${index}`}>
            #{index + 1}: {record}
          </Text>
        ))}
      </div>
      <div className={cn.addRecord}>

      </div>
    </>
  );
};
