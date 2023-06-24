import { Meta, StoryObj } from "@storybook/react";
import NewIdeaListItem from "./NewIdeaListItem";

const meta: Meta<typeof NewIdeaListItem> = {
  component: NewIdeaListItem,
  decorators: [
    (Story) => (
      <div style={{ background: "#ece8e3", padding: "100px" }}>
        <div style={{ background: "#ece8e3", margin: "3em" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof NewIdeaListItem> = {};
Default.args = {
  id: "1",
  leftStyle: "circle",
  rightStyle: "triangle",
};

export const Emphasized: StoryObj<typeof NewIdeaListItem> = {};
Emphasized.args = {
  id: "1",
  leftStyle: "circle",
  rightStyle: "triangle",
};

export const Circle: StoryObj<typeof NewIdeaListItem> = {};
Circle.args = {
  id: "1",
  leftStyle: "circle",
  rightStyle: "circle",
};

export const Triangle: StoryObj<typeof NewIdeaListItem> = {};
Triangle.args = {
  id: "1",
  leftStyle: "triangle",
  rightStyle: "triangle",
};
