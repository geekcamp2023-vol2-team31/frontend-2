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
    { id: "1", name: "user1", level: "beginner" },
    { id: "2", name: "user2", level: "advanced" },
    { id: "3", name: "user3", level: "advanced" },
  ],
  actionType: "plus",
};

export const WithoutAction: StoryObj<typeof TechListItem> = {};
WithoutAction.args = {
  id: "1",
  label: "TypeScript",
  users: [
    { id: "1", name: "user1", level: "beginner" },
    { id: "2", name: "user2", level: "advanced" },
    { id: "3", name: "user3", level: "advanced" },
  ],
};
