import { Meta, StoryObj } from "@storybook/react";
import { TeamSettingsContainer } from "@/components/teams/TeamSettingsContainer/TeamSettingsContainer";
import { SidebarWrapper } from "./SidebarWrapper";

const meta: Meta<typeof SidebarWrapper> = {
  component: SidebarWrapper,
};
export default meta;

export const Default: StoryObj<typeof SidebarWrapper> = {
  render: () => (
    <>
      <SidebarWrapper width={400}>
        <TeamSettingsContainer teamId="1" />
      </SidebarWrapper>
    </>
  ),
};
