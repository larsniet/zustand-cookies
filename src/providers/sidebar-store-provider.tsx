"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type SidebarStore,
  createSidebarStore,
  initSidebarStore,
} from "@/stores/sidebar-store";

export type SidebarStoreApi = ReturnType<typeof createSidebarStore>;

export const SidebarStoreContext = createContext<SidebarStoreApi | undefined>(
  undefined
);

export interface SidebarStoreProviderProps {
  sidebarOpen: boolean;
  children: ReactNode;
}

export const SidebarStoreProvider = ({
  sidebarOpen,
  children,
}: SidebarStoreProviderProps) => {
  const storeRef = useRef<SidebarStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSidebarStore(initSidebarStore({ sidebarOpen }));
  }

  return (
    <SidebarStoreContext.Provider value={storeRef.current}>
      {children}
    </SidebarStoreContext.Provider>
  );
};

export const useSidebarStore = <T,>(
  selector: (store: SidebarStore) => T
): T => {
  const counterStoreContext = useContext(SidebarStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useSidebarStore must be used within SidebarStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
