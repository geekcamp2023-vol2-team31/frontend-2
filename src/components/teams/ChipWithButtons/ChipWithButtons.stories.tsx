import { Meta, StoryObj } from "@storybook/react";
import { ChipWithButtons } from "./ChipWithButtons.presenter";

type Story = StoryObj<typeof ChipWithButtons>;

const meta = {
  component: ChipWithButtons,
  argTypes: {},
} satisfies Meta<typeof ChipWithButtons>;

export default meta;

export const Default: Story = {};
