// import { createContext, useContext } from 'react';
// import { useStore } from './useStore/useStore.ts';
import { StoreProvider } from '../react-store-ts';

// const NearContext = createContext<any>(undefined);

export const NearStoreProvider = ({ nearStore, children }: any) => {
  return <StoreProvider store={nearStore}>{children}</StoreProvider>;
};

// export const useNearContext = () => {
//   const nearContext = useContext(NearContext);
//
//   if (!nearContext)
//     throw new Error('useNearContext must be used within NearProvider.');
//
//   return nearContext;
// };
