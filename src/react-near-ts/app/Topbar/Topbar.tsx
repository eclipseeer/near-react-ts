import { Button, Title } from '@mantine/core';
import { useConnectedAccount } from '../../../react-near-ts-mini/lib/hooks/useConnectedAccount.ts';
import cn from './Topbar.module.css';

export const Topbar = () => {
  const { connectedAccountId } = useConnectedAccount();

  return (
    <div className={cn.topbar}>
      <Title order={3}>Near React TS</Title>
      <div className={cn.leftSide}>
        {connectedAccountId ? (
          <p>{connectedAccountId}</p>
        ) : (
          <>
            <Button>Connect Wallet</Button>
            {/*<Button onClick={check}>Check</Button>*/}
          </>
        )}
      </div>
    </div>
  );
};
