import { useAccountInfo } from '../../lib/useAccountInfo.ts';

export const AccountCard = () => {
  const { data, isPending, isError } = useAccountInfo({
    accountId: 'near',
    networkId: 'testnet',
  });

  if (isPending) return null;

  if (isError)
    return (
      <div>
        <p>Cannot show account card</p>
      </div>
    );

  return (
    <div
      style={{ padding: '10px', border: '1px solid gray', margin: '10px 0' }}
    >
      <h3>Account Card</h3>
      <p>AccountId: {(data as any).accountId}</p>
      <p>Near Balance: {(data as any).accountInfo.balance.total.near}</p>
    </div>
  );
};
