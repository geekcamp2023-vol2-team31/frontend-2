import { Meta, StoryObj } from "@storybook/react";
import IdeaListItem from "./IdeaListItem";

const meta: Meta<typeof IdeaListItem> = {
  component: IdeaListItem,
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

export const Default: StoryObj<typeof IdeaListItem> = {};
Default.args = {
  id: "1",
  body: "test",
  leftStyle: "circle",
  rightStyle: "triangle",
  onChangeCheckbox: undefined,
};

export const Emphasized: StoryObj<typeof IdeaListItem> = {};
Emphasized.args = {
  id: "1",
  body: "test",
  leftStyle: "circle",
  rightStyle: "triangle",
  emphasized: true,
};

export const WithCheckbox: StoryObj<typeof IdeaListItem> = {};
WithCheckbox.args = {
  id: "1",
  body: "test",
  leftStyle: "circle",
  rightStyle: "triangle",
  checkboxValue: true,
};

export const Circle: StoryObj<typeof IdeaListItem> = {};
Circle.args = {
  id: "1",
  body: "test",
  leftStyle: "circle",
  rightStyle: "circle",
};

export const Triangle: StoryObj<typeof IdeaListItem> = {};
Triangle.args = {
  id: "1",
  body: "test",
  leftStyle: "triangle",
  rightStyle: "triangle",
};
