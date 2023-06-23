import { Meta, StoryObj } from "@storybook/react";
import { ProductContainer } from "./ProductContainer";

const meta: Meta<typeof ProductContainer> = {
  component: ProductContainer,
};
export default meta;

export const Default: StoryObj<typeof ProductContainer> = {};
Default.args = {
  teamId: "1",
  productId: "2",
};
