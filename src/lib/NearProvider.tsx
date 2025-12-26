import { createContext, type ReactNode, useContext } from 'react';
import type { Client } from 'near-api-ts';

type NearContext = {
  client: Client;
};

type NearProviderProps = {
  client: Client;
  children: ReactNode;
};

const NearContext = createContext<NearContext | undefined>(undefined);

export const NearProvider = ({ client, children }: NearProviderProps) => (
  <NearContext.Provider value={{ client }}>{children}</NearContext.Provider>
);

export const useNearContext = () => {
  const nearContext = useContext(NearContext);

  if (!nearContext)
    throw new Error(
      'useNearContext must be used within NearProvider.',
    );

  return nearContext;
};
