import type { Meta, StoryObj } from "@storybook/react";

import { BasicProfileEditor } from "./BasicProfileEditor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta: Meta<typeof BasicProfileEditor> = {
  title: "BasicProfileEditor",
  component: BasicProfileEditor,
};

export default meta;
type Story = StoryObj<typeof BasicProfileEditor>;
const queryClient = new QueryClient();

export const Primary: Story = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <BasicProfileEditor />
    </QueryClientProvider>
  ),
};
