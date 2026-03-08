import React from 'react';
import type { ILocalStore } from '@entities/ILocalStore';

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const [store] = React.useState<T>(() => creator());
  React.useEffect(() => {
    return () => store.destroy();
  }, [store]);
  return store;
};
