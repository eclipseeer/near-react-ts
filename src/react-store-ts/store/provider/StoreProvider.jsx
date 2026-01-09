import { createContext, useContext } from 'react';

export const StoreContext = createContext({});

export const StoreProvider = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export const useStoreContext = () => useContext(StoreContext);

// TODO use validations
// export const useNearContext = () => {
//   const nearContext = useContext(NearContext);
//
//   if (!nearContext)
//     throw new Error('useNearContext must be used within NearProvider.');
//
//   return nearContext;
// };
