import { createContext, useContext } from 'react';
import { useStore } from './useStore/useStore.ts';

const NearContext = createContext<any>(undefined);

export const NearProvider = (props: any) => {
  const store = useStore(props);
  return (
    <NearContext.Provider value={store}>{props.children}</NearContext.Provider>
  );
};

export const useNearContext = () => {
  const nearContext = useContext(NearContext);

  if (!nearContext)
    throw new Error('useNearContext must be used within NearProvider.');

  return nearContext;
};
