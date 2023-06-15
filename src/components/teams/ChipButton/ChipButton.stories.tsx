import type { Meta, StoryObj } from "@storybook/react";

import { ChipButton } from "./ChipButton";
import { FlagIcon } from "@/assets/flagIcon";
import { DrawIcon } from "@/assets/drawIcon";
import { DeleteIcon } from "@/assets/deleteIcon";
import { SchoolIcon } from "@/assets/schoolIcon";
import style from "./ChipButton.module.scss";

const meta = {
  title: "ChipButton",
  component: ChipButton,
} satisfies Meta<typeof ChipButton>;

export default meta;
type Story = StoryObj<typeof ChipButton>;
export const Beginner: Story = {
  args: {
    target: { key: "beginner", level: "beginner" },
    children: <FlagIcon className={style.button} />,
    className: style.buttonReset,
    onClick: () => console.log("clicked!"),
  },
  render: (args) => <ChipButton {...args} />,
};

export const Advanced: Story = {
  args: {
    target: { key: "advanced", level: "advanced" },
    children: <DrawIcon className={style.button} />,
    className: style.buttonReset,
    onClick: () => console.log("clicked!"),
  },
  render: (args) => <ChipButton {...args} />,
};

export const Expert: Story = {
  args: {
    target: { key: "expert", level: "expert" },
    children: <SchoolIcon className={style.active} />,
    className: style.buttonReset,
    onClick: () => console.log("clicked!"),
  },
  render: (args) => <ChipButton {...args} />,
};

export const Delete: Story = {
  args: {
    target: { key: "delete", level: "delete" },
    children: <DeleteIcon className={style.active} />,
    className: style.buttonReset,
    onClick: () => console.log("clicked!"),
  },
  render: (args) => <ChipButton {...args} />,
};
