import type { Meta, StoryObj } from "@storybook/react";

import { TeamSelector } from "./TeamSelector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta: Meta<typeof TeamSelector> = {
  title: "TeamSelector",
  component: TeamSelector,
};

export default meta;
type Story = StoryObj<typeof TeamSelector>;
const queryClient = new QueryClient();

export const Primary: Story = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <TeamSelector />
    </QueryClientProvider>
  ),
};
