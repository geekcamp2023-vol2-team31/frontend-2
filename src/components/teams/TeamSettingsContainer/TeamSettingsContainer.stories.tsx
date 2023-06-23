import { Meta, StoryObj } from "@storybook/react";
import { TeamSettingsContainer } from "./TeamSettingsContainer";

const meta: Meta<typeof TeamSettingsContainer> = {
  component: TeamSettingsContainer,
};
export default meta;

export const Default: StoryObj<typeof TeamSettingsContainer> = {};
Default.args = {
  teamId: "1",
};
