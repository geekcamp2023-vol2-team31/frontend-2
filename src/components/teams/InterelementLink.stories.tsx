import type { Meta, StoryObj } from "@storybook/react";

import InterelementLink from "./InterelementLink";

const meta: Meta<typeof InterelementLink> = {
  title: "InterelementLink",
  component: InterelementLink,
};

export default meta;

type Story = StoryObj<typeof InterelementLink>;
export const NoEmphasized: Story = {
  render: () => (
    <InterelementLink
      key="1"
      x0={100}
      y0={100}
      x1={200}
      y1={200}
      emphasized={false}
    />
  ),
};
export const Emphasized: Story = {
  render: () => (
    <InterelementLink
      key="2"
      x0={100}
      y0={200}
      x1={200}
      y1={100}
      emphasized={true}
    />
  ),
};
export const Both: Story = {
  render: () => (
    <>
      <InterelementLink
        key="1"
        x0={100}
        y0={100}
        x1={200}
        y1={200}
        emphasized={false}
      />
      <InterelementLink
        key="2"
        x0={100}
        y0={200}
        x1={200}
        y1={100}
        emphasized={true}
      />
    </>
  ),
};
export const Primary: Story = {
  render: () => (
    <>
      <InterelementLink
        key="1"
        x0={100}
        y0={100}
        x1={200}
        y1={200}
        emphasized={false}
      />
      <InterelementLink
        key="2"
        x0={100}
        y0={200}
        x1={200}
        y1={100}
        emphasized={true}
      />
      <InterelementLink
        key="3"
        x0={400}
        y0={200}
        x1={500}
        y1={100}
        emphasized={false}
      />
      <InterelementLink
        key="4"
        x0={400}
        y0={100}
        x1={500}
        y1={400}
        emphasized={true}
      />
    </>
  ),
};
