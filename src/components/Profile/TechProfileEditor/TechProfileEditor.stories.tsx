import type { Meta, StoryObj } from "@storybook/react";

import { TechProfileEditor } from "./TechProfileEditor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta: Meta<typeof TechProfileEditor> = {
  title: "TechProfileEditor",
  component: TechProfileEditor,
};

export default meta;
type Story = StoryObj<typeof TechProfileEditor>;
const queryClient = new QueryClient();

export const Default: Story = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <TechProfileEditor />
    </QueryClientProvider>
  ),
};
