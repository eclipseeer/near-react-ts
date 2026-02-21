import { Title, Text, Button } from '@mantine/core';
import { useExecuteTransaction } from '../../../lib/hooks/useExecuteTransaction.ts';
import cn from './AddRecord.module.css';
import { transfer } from 'near-api-ts';

export const AddRecord = () => {
  const { executeTransaction, data, error, isLoading, isError, isSuccess } =
    useExecuteTransaction();

  if (isError) {
    console.log(error);
  }

  const sendNear = () => {
    executeTransaction({
      intent: {
        action: transfer({ amount: { near: '0.01' } }),
        receiverAccountId: 'lantstool.testnet',
      },
    });
  };

  return (
    <>
      <Title order={3}>Send 1 Yocto Near</Title>
      <div className={cn.info}>
        <Button onClick={sendNear}>Send 1 Yocto Near</Button>
      </div>
      {isLoading && <Text>Loading...</Text>}
      {isSuccess && (
        <div>
          <Title order={5}>Success!</Title>
          <Text>Transaction Hash: {data.rawRpcResult.transaction.hash}</Text>
        </div>
      )}
      {isError && (
        <div>
          <Title order={5}>Error!</Title>
        </div>
      )}
    </>
  );
};
