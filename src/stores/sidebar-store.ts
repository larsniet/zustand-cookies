import { setCookie } from "cookies-next";
import { createStore } from "zustand/vanilla";

export type SidebarState = {
  isOpen: boolean;
};

export type SidebarActions = {
  toggleSidebar: () => void;
};

export type SidebarStore = SidebarState & SidebarActions;

export const initSidebarStore = ({
  sidebarOpen,
}: {
  sidebarOpen: boolean;
}): SidebarState => {
  return { isOpen: sidebarOpen };
};

export const defaultInitState: SidebarState = {
  isOpen: false,
};

export const createSidebarStore = (
  initState: SidebarState = defaultInitState
) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    toggleSidebar: () => {
      set((state) => {
        const newOpenState = !state.isOpen;
        setCookie("sidebarOpen", String(newOpenState));
        return { ...state, isOpen: newOpenState };
      });
    },
  }));
};
