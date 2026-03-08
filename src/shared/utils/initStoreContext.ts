import * as React from 'react';

export const initStoreContext = <T>(storeCreator: () => T, storeName: string) => {
  const store = storeCreator();
  const StoreContext = React.createContext(store);

  const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) =>
    React.createElement(StoreContext.Provider, { value: store }, children);

  const useStoreContext = (): T => {
    const contextStore = React.useContext(StoreContext);
    if (!contextStore) {
      throw new Error(`"${storeName}" is not found`);
    }
    return contextStore;
  };

  return { store, StoreContext, StoreProvider, useStoreContext };
};
