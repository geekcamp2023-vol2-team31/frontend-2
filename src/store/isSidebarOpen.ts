import { create } from "zustand";

type IsSidebarOpen = {
  isOpen: boolean;
  toggleOpen: () => void;
};

export const useIsSidebarOpen = create<IsSidebarOpen>((set) => ({
  isOpen: false,
  toggleOpen: () =>
    set((state) => {
      return { isOpen: !state.isOpen };
    }),
}));
