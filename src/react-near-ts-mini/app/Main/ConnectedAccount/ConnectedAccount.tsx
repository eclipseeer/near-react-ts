import { Skeleton, Text, Title } from '@mantine/core';
import { useAccountInfo } from '../../../lib/hooks/useAccountInfo.ts';
import { useConnectedAccount } from '../../../lib/hooks/useConnectedAccount.ts';
import cn from './ConnectedAccount.module.css';

export const ConnectedAccount = () => {
  const { connectedAccountId } = useConnectedAccount();
  const { data, isPending, isFetching, isError } = useAccountInfo({
    accountId: connectedAccountId,
  });

  if (isPending) return <Text>loading...</Text>;
  if (isError) return <Text>Connected account not found...</Text>;

  return (
    <>
      <Title order={3}>Connected Account</Title>

      <div className={cn.info}>
        <div className={cn.row}>
          <Text>Account ID</Text>
          {isFetching ? (
            <Skeleton width={300} height={18} />
          ) : (
            <Text>{(data as any).accountId}</Text>
          )}
        </div>
        <div className={cn.row}>
          <Text>Total Balance</Text>
          {isFetching ? (
            <Skeleton width={300} height={18} />
          ) : (
            <Text>{(data as any).accountInfo.balance.total.near} NEAR</Text>
          )}
        </div>
        <div className={cn.row}>
          <Text>Available Balance</Text>
          {isFetching ? (
            <Skeleton width={300} height={18} />
          ) : (
            <Text>{(data as any).accountInfo.balance.available.near} NEAR</Text>
          )}
        </div>
        <div className={cn.row}>
          <Text>Storage Usage</Text>
          {isFetching ? (
            <Skeleton width={300} height={18} />
          ) : (
            <Text>{(data as any).accountInfo.usedStorageBytes} bytes</Text>
          )}
        </div>
      </div>
    </>
  );
};
