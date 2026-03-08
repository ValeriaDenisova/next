import React, { createContext, useContext, useMemo } from 'react';
import {RootStore} from './RootStore';

type StoreContextType = { store: RootStore };

const StoreContext = createContext<StoreContextType | null>(null);

export const useStores = (): { store: RootStore } => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('StoreContext не найден. Оберни приложение в <StoreProvider>.');
  return ctx;
};

export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const store = useMemo(() => new RootStore(), []);
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};