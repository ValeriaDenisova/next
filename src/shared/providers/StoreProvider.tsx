'use client';

import React, { createContext, ReactNode } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { rootStore } from '@store/globals/root/RootStore'; 

interface StoreContextType {
  rootStore: typeof rootStore;
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useLocalObservable(() => ({
    rootStore,
  }));

  return (
    <StoreContext.Provider value={{ rootStore: store.rootStore }}>
      {children}
    </StoreContext.Provider>
  );
};