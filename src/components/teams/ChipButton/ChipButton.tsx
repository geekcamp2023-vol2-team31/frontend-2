import { FC, ReactNode } from "react";

interface IChipButtonPrdops {
  target: { key: string; level: "beginner" | "advanced" | "expert" | "delete" };
  children: ReactNode;
  className: string;
  onClick: (event: IChipButtonClickEvent) => void;
}

export interface IChipButtonClickEvent {
  target: { key: string; level: "beginner" | "advanced" | "expert" | "delete" };
}

export const ChipButton: FC<IChipButtonPrdops> = ({
  target,
  children,
  className,
  onClick,
}) => {
  const handleClick = () => {
    onClick({ target });
  };
  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};
