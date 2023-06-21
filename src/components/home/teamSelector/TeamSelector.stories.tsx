import type { Meta, StoryObj } from "@storybook/react";

import { TeamSelector } from "./TeamSelector";

const meta: Meta<typeof TeamSelector> = {
  title: "TeamSelector",
  component: TeamSelector,
};

export default meta;

export const Default: StoryObj<typeof TeamSelector> = {};
Default.args = {
  belongs: [
    {
      id: "1",
      name: "アイディア出しズ",
    },
    {
      id: "2",
      name: "アイディア出しズ2",
    },
  ],
};

export const WithoutTeams: StoryObj<typeof TeamSelector> = {};
WithoutTeams.args = {
  belongs: [],
};
