import { create } from "zustand";

type IsSidebarOpen = {
  isOpen: boolean;
  isShowTeamSettingsContainer: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
};

export const useIsSidebarOpen = create<IsSidebarOpen>((set) => ({
  isOpen: false,
  isShowTeamSettingsContainer: false,
  toggleSidebar: () =>
    set((state) => {
      return { isOpen: !state.isOpen };
    }),
  openSidebar: () =>
    set(() => {
      return { isOpen: true };
    }),
  toggleIsShowContainer: () =>
    set((state) => {
      return { isShowTeamSettingsContainer: !state };
    }),
}));
