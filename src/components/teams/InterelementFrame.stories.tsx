import type { Meta, StoryObj } from "@storybook/react";

import InterelementFrame from "./InterelementFrame";

const meta: Meta<typeof InterelementFrame> = {
  title: "InterelementFrame",
  component: InterelementFrame,
};

export default meta;

type Story = StoryObj<typeof InterelementFrame>;
export const Primary: Story = {
  render: () => (
    <>
      <InterelementFrame x={20} y={20} width={200} height={300} />
    </>
  ),
};
