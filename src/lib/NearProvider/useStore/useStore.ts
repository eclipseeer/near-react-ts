import { useEffect, useState } from 'react';
import { createNearState } from './createNearState.ts';

export const useStore = (props: any) => {
  const [store, setStore] = useState<any>({
    data: undefined,
    error: undefined,
    ok: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const nearState = await createNearState(props);
        // TODO use state + subscriptions: rerender only what we need
        setStore({
          data: {
            nearState,
            setStore,
          },
          error: undefined,
          ok: true,
        });
      } catch (e) {
        setStore({
          data: undefined,
          error: e,
          ok: false,
        });
      }
    })();
  }, [props]);

  return store;
};
