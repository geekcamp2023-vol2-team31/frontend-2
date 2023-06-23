import { Meta, StoryObj } from "@storybook/react";
import TechListItem from "./TechListItem";

const meta: Meta<typeof TechListItem> = {
  component: TechListItem,
  decorators: [
    (Story) => (
      <div style={{ background: "#ece8e3", padding: "50px" }}>
        <div style={{ background: "#ece8e3", margin: "3em" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof TechListItem> = {};
Default.args = {
  id: "1",
  label: "TypeScript",
  users: [
    {
      userName: "satojin",
      userToTech: { tech: { name: "TypeScript" }, level: "beginner" },
    },
    {
      userName: "satojin",
      userToTech: { tech: { name: "JavaScript" }, level: "beginner" },
    },
    {
      userName: "satojin",
      userToTech: { tech: { name: "C++" }, level: "advanced" },
    },
  ],
  actionType: "plus",
};

export const WithoutAction: StoryObj<typeof TechListItem> = {};
WithoutAction.args = {
  id: "1",
  label: "TypeScript",
  users: [
    {
      userName: "satojin",
      userToTech: { tech: { name: "TypeScript" }, level: "beginner" },
    },
    {
      userName: "satojin",
      userToTech: { tech: { name: "JavaScript" }, level: "beginner" },
    },
    {
      userName: "satojin",
      userToTech: { tech: { name: "C++" }, level: "advanced" },
    },
  ],
};
