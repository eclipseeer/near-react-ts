```typescript jsx

const UserAccountBalance = () => {
  const [accountId, setAccountId] = useState('near');

  const {
    data,
    error,
    isPending,
    isFetching,
    isSuccess,
    isError,
  } = useAccountInfo({ accountId });
  
  return (
    <div>
      <p>Total NEAR balance of {accountId}: {data.accountInfo.balance.total}</p>
    </div>
  );
};

const SendTokens = () => {
  const {
    executeTransaction,
    result,
    error,
    isPending,
    isSuccess,
  } = useExecuteTransaction();

  return (
    <div>
      <button>Send</button>
    </div>
  );
};

```
