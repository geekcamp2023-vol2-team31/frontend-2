import type { Meta, StoryObj } from "@storybook/react";

import { BasicProfileEditor } from "./BasicProfileEditor"

const meta: Meta<typeof BasicProfileEditor> = {
  title: "BasicProfileEditor",
  component: BasicProfileEditor,
};

export default meta;
type Story = StoryObj<typeof BasicProfileEditor>;

export const Primary: Story = {
  render: () => <BasicProfileEditor />,
};
