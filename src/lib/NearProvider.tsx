import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { Client } from 'near-api-ts';

// type NearContext = {
//   client: Client;
// };
//
// type NearProviderProps = {
//   client: Client;
//   children: ReactNode;
// };

const NearContext = createContext<any>(undefined);

export const NearProvider = ({ createContext, children }: any) => {
  // TODO use Result wrapper for all hooks
  const [state, setState] = useState<any>({
    context: undefined,
    error: undefined,
    ok: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const nearContext = await createContext();

        setState({
          context: nearContext,
          setState, // TODO use state + subscriptions: rerender only what we need
          error: undefined,
          ok: true,
        });
      } catch (e) {
        setState({
          context: undefined,
          error: e,
          ok: false,
        });
      }
    })();
  }, [createContext]);

  return <NearContext.Provider value={state}>{children}</NearContext.Provider>;
};

export const useNearContext = () => {
  const nearContext = useContext(NearContext);

  if (!nearContext)
    throw new Error('useNearContext must be used within NearProvider.');

  return nearContext;
};
