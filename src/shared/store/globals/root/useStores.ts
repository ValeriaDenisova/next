import { useContext, createContext } from "react";
import { RootStore } from "./RootStore";

type StoreContextType = { store: RootStore };
export const StoreContext = createContext<StoreContextType | null>(null);

export const useStores = (): { store: RootStore } => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("StoreContext не найден. Оберни приложение в <StoreProvider>.");
  return ctx;
};
