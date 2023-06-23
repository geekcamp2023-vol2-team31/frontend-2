import { FC, ReactNode } from "react";
import style from "./Sidebar.module.scss";
import { useIsSidebarOpen } from "@/store/isSidebarOpen";

type Props = {
  width: number;
  children: ReactNode;
};

export const SidebarWrapper: FC<Props> = ({ width, children }) => {
  const isSidebarOpen = useIsSidebarOpen((state) => state.isOpen);

  return (
    <>
      <div className={style.wrapper}>
        <div
          style={{ width: `${width}px` }}
          className={isSidebarOpen ? style.open : style.close}
        >
          {children}
        </div>
      </div>
    </>
  );
};
