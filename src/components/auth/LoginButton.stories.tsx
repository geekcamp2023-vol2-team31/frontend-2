import type { Meta, StoryObj } from "@storybook/react";

import { LoginButton } from "./LoginButton";

const meta: Meta<typeof LoginButton> = {
  title: "LoginButton",
  component: LoginButton,
};

export default meta;
type Story = StoryObj<typeof LoginButton>;

export const Primary: Story = {
  render: () => <LoginButton />,
};
