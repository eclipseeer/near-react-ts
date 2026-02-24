import { Text, Title } from '@mantine/core';
import { useAccountInfo } from '../../../lib/hooks/useAccountInfo.ts';
import cn from './ConnectedAccount.module.css';
import { useConnectedAccount } from '../../../lib/hooks/useConnectedAccount.ts';

export const ConnectedAccount = () => {
  const { connectedAccountId } = useConnectedAccount();
  const accountInfo = useAccountInfo({ accountId: connectedAccountId });

  console.log(accountInfo);

  if (accountInfo.isPending) return <Text>Loading...</Text>;
  if (accountInfo.isError)
    return <Text>Error during loading the account info...</Text>;


  return (
    <>
      <Title order={3}>Connected Account</Title>
      <div className={cn.info}>
        <div className={cn.row}>
          <Text>Account ID</Text>
          <Text>{accountInfo.data.accountId}</Text>
        </div>
        <div className={cn.row}>
          <Text>Total Balance</Text>
          <Text>{accountInfo.data.accountInfo.balance.total.near} NEAR</Text>
        </div>
        <div className={cn.row}>
          <Text>Available Balance</Text>
          <Text>
            {accountInfo.data.accountInfo.balance.available.near} NEAR
          </Text>
        </div>
        <div className={cn.row}>
          <Text>Storage Usage</Text>
          <Text>{accountInfo.data.accountInfo.usedStorageBytes} bytes</Text>
        </div>
      </div>
    </>
  );
};
