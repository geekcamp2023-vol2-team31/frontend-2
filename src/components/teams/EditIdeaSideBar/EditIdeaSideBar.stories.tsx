import { Meta, StoryObj } from "@storybook/react";
import { EditIdeaSideBar } from "./EditIdeaSideBar";

const meta: Meta<typeof EditIdeaSideBar> = {
  component: EditIdeaSideBar,
};
export default meta;

export const Default: StoryObj<typeof EditIdeaSideBar> = {};
Default.args = {
  ideaName: "技術COMP",
  estimatedTechList: [
    {
      id: "1",
      label: "TypeScript",
      users: [
        { id: "1", name: "user1", level: "beginner" },
        { id: "2", name: "user2", level: "advanced" },
        { id: "3", name: "user3", level: "advanced" },
      ],
      actionType: "plus",
      onActionClick: () => console.log("click"),
      leftSlot: <></>,
    },
    {
      id: "2",
      label: "Node.js",
      users: [
        { id: "1", name: "user1", level: "beginner" },
        { id: "3", name: "user3", level: "expert" },
      ],
      actionType: "plus",
      onActionClick: () => console.log("click"),
      leftSlot: <></>,
    },
  ],
  memberHasTechList: [
    {
      id: "1",
      label: "TypeScript",
      users: [
        { id: "1", name: "user1", level: "beginner" },
        { id: "2", name: "user2", level: "advanced" },
        { id: "3", name: "user3", level: "advanced" },
      ],
      actionType: "plus",
      onActionClick: () => console.log("click"),
      leftSlot: <></>,
    },
  ],
  onClose: () => console.log("close"),
};
