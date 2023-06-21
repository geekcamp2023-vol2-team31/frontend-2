import { Meta, StoryObj } from "@storybook/react";
import { ChipWithButtons } from "./ChipWithButtons.presenter";
import { ChipButton } from "../ChipButton/ChipButton";
import { FlagIcon } from "@/assets/flagIcon";
import style from "./ChipWithButtons.module.scss";
import { DrawIcon } from "@/assets/drawIcon";
import { SchoolIcon } from "@/assets/schoolIcon";
import { DeleteIcon } from "@/assets/deleteIcon";

type Story = StoryObj<typeof ChipWithButtons>;

const meta = {
  component: ChipWithButtons,
  argTypes: {},
} satisfies Meta<typeof ChipWithButtons>;

export default meta;

export const Default: Story = {
  args: {
    id: "React",
    label: "React",
    leftSlot: <div></div>,
    buttonGroup: (
      <>
        <ChipButton
          target={{ key: "beginner", level: "beginner" }}
          className={style.buttonReset}
          onClick={() => console.log("clicked!")}
        >
          <FlagIcon className={style.icon} />
        </ChipButton>
        <ChipButton
          target={{ key: "advanced", level: "advanced" }}
          className={style.buttonReset}
          onClick={() => console.log("clicked!")}
        >
          <DrawIcon className={style.icon} />
        </ChipButton>
        <ChipButton
          target={{ key: "expert", level: "expert" }}
          className={style.buttonReset}
          onClick={() => console.log("clicked!")}
        >
          <SchoolIcon className={style.icon} />
        </ChipButton>
        <ChipButton
          target={{ key: "delete", level: "delete" }}
          className={style.buttonReset}
          onClick={() => console.log("clicked!")}
        >
          <DeleteIcon className={style.active} />
        </ChipButton>
      </>
    ),
    background: "#3998B6",
  },
  render: (args) => <ChipWithButtons {...args} />,
};
