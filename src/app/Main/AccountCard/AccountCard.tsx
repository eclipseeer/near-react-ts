import { Title, Text, Skeleton } from '@mantine/core';
import { useAccountInfo } from '../../../lib/useAccountInfo.ts';
import cn from './AccountCard.module.css';
import {useSelectedAccount} from '../../../lib/useSelectedAccount.ts';

export const AccountCard = () => {
  const { selectedAccountId } = useSelectedAccount();
  const { data, isPending, isFetching, isError } = useAccountInfo({
    accountId: selectedAccountId,
  });

  if (isPending) return null;

  if (isError)
    return (
      <div>
        <p>Cannot show account card</p>
      </div>
    );

  return (
    <>
      <Title order={3}>Selected Account Card</Title>

      <div className={cn.info}>
        <div className={cn.row}>
          <Text>Account ID</Text>
          <Text>{(data as any).accountId}</Text>
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
