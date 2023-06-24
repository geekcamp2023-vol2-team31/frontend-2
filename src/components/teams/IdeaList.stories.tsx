import { Meta, StoryObj } from "@storybook/react";
import IdeaList from "./IdeaList";

const meta: Meta<typeof IdeaList> = {
  component: IdeaList,
  decorators: [
    (Story) => (
      <div style={{ background: "gray", padding: "100px" }}>
        <div style={{ background: "gray", margin: "3em" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof IdeaList> = {};
Default.args = {
  id: "1",
  label: "困り事・背景",
  leftStyle: "circle",
  rightStyle: "triangle",
  items: [
    {
      id: "1",
      body: "アイデア１",
    },
    {
      id: "2",
      body: "アイデア２",
    },
    {
      id: "3",
      body: "アイデア３",
    },
    {
      id: "4",
      body: "アイデア４",
    },
    {
      id: "5",
      body: "アイデア５",
    },
  ],
};
