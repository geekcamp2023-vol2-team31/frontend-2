import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Common Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;
export const Default: Story = {
  args: {
    title: "技術CAMPのアイデア出しをサポーターズ",
    invidationCode: "#0oi1IL",
  },
  render: (args) => <Header {...args} />,
};
export const NonInvidationCode: Story = {
  args: {
    title: "ようこそ!",
    invidationCode: "",
  },
  render: (args) => <Header {...args} />,
};
