import type { Meta, StoryObj } from "@storybook/react";

import { Account } from "./Account";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta: Meta<typeof Account> = {
  title: "Account",
  component: Account,
};

export default meta;
type Story = StoryObj<typeof Account>;
const queryClient = new QueryClient();

export const Primary: Story = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <Account />
    </QueryClientProvider>
  ),
};
