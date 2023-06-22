import type { Meta, StoryObj } from "@storybook/react";

import { NewChip } from "./NewChip";
import { FlagIcon } from "@/assets/flagIcon";
import { DrawIcon } from "@/assets/drawIcon";
import { DeleteIcon } from "@/assets/deleteIcon";
import { SchoolIcon } from "@/assets/schoolIcon";
import style from "./NewChip.module.scss";

const meta = {
  title: "NewChip",
  component: NewChip,
} satisfies Meta<typeof NewChip>;

export default meta;
type Story = StoryObj<typeof NewChip>;
export const Beginner: Story = {
  args: {
    id: "flag",
    onEnter: () => console.log("a"),
    children: <FlagIcon className={style.button} />,
  },
  render: (args) => <NewChip {...args} />,
};

export const Advanced: Story = {
  args: {
    id: "draw",
    onEnter: () => console.log("a"),
    children: <DrawIcon className={style.button} />,
  },
  render: (args) => <NewChip {...args} />,
};

export const Expert: Story = {
  args: {
    id: "school",
    onEnter: () => console.log("a"),
    children: <SchoolIcon className={style.active} />,
  },
  render: (args) => <NewChip {...args} />,
};

export const Delete: Story = {
  args: {
    id: "school",
    onEnter: () => console.log("a"),
    children: <DeleteIcon className={style.active} />,
  },
  render: (args) => <NewChip {...args} />,
};
