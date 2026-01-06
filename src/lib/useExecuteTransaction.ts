import { useNearContext } from './NearProvider/NearProvider.tsx';

// selectedNetwork + selectedAccount + signer (automatically)
export const useExecuteTransaction = () => {
  const nearContext = useNearContext();
};


/*
Перестворення signers кожний раз після selectAccount?

const { result, error, isLoading, executeTransaction } = useExecuteTransaction()
 */
