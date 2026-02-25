import { Title, Text, Button } from '@mantine/core';
import { useExecuteTransaction } from '../../../lib/hooks/useExecuteTransaction.ts';
import cn from './SendNearTokens.module.css';
import { transfer } from 'near-api-ts';

export const SendNearTokens = () => {
  const executeTransaction = useExecuteTransaction();

  const sendNear = () =>
    executeTransaction.mutate({
      intent: {
        action: transfer({ amount: { yoctoNear: 1n } }),
        receiverAccountId: 'lantstool.testnet',
      },
    });

  return (
    <>
      <Title order={3}>Send 1 Yocto Near</Title>
      <div className={cn.info}>
        <Button onClick={sendNear}>Send 1 Yocto Near</Button>
      </div>
      {executeTransaction.isSuccess && (
        <div>
          <Title order={5}>Success!</Title>
          <Text>
            Transaction Hash:{' '}
            {executeTransaction.data.rawRpcResult.transaction.hash}
          </Text>
        </div>
      )}
      {executeTransaction.isError && (
        <div>
          <Text>Error: {executeTransaction.error.message}</Text>
        </div>
      )}
    </>
  );
};
