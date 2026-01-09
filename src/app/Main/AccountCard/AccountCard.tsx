import { Title, Text, Skeleton } from '@mantine/core';
import { useAccountInfo } from '../../../lib/useAccountInfo.ts';
import cn from './AccountCard.module.css';
import { useSelectedAccount } from '../../../lib/useSelectedAccount.ts';

export const AccountCard = () => {
  const { selectedAccountId } = useSelectedAccount();
  const { data, isPending, isFetching, isError } = useAccountInfo({
    accountId: selectedAccountId,
  });

  console.log(selectedAccountId);

  if (isPending) return <Text>loading...</Text>;
  if (isError) return <Text>Selected account not found...</Text>;

  return (
    <>
      <Title order={3}>Selected Account</Title>

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
          <Text>Total Near Balance</Text>
          {isFetching ? (
            <Skeleton width={300} height={18} />
          ) : (
            <Text>{(data as any).accountInfo.balance.total.near}</Text>
          )}
        </div>
      </div>
    </>
  );
};
