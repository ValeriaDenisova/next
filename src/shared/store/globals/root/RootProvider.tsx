import React, { useMemo } from "react";
import { RootStore } from "./RootStore";
import { StoreContext } from "./useStores";

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useMemo(() => new RootStore(), []);
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};
