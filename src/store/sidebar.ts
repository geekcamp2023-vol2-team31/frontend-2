import { create } from "zustand";

type Sidebar = {
  isOpen: boolean;
  toggleOpen: () => void;
};

export const useSidebar = create<Sidebar>((set) => ({
  isOpen: false,
  toggleOpen: () =>
    set((state) => {
      return { isOpen: !state.isOpen };
    }),
}));
