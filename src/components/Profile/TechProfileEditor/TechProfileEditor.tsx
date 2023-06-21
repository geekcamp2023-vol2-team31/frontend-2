import { FlagIcon } from "@/assets/flagIcon";
import style from "./TechProfileEditor.module.scss";
import { FC } from "react";
import { ChipWithButtons } from "@/components/teams/ChipWithButtons";
import { ChipButton } from "@/components/teams/ChipButton/ChipButton";
import { DrawIcon } from "@/assets/drawIcon";
import { SchoolIcon } from "@/assets/schoolIcon";
import { DeleteIcon } from "@/assets/deleteIcon";
import { NewChip } from "@/components/teams/NewChip/NewChip";
import { SuggestIcon } from "@/assets/suggest";

export const TechProfileEditor: FC = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>技術スタック</h1>
      <p className={style.description}>
        あなたのチームのメンバーに、あなたの技術スタックを教えることができます。チャレンジする技術を決めるときの参考になります。
      </p>
      <div className={style.techContainer}>
        <div className={style.techTitle}>
          <FlagIcon className={style.icon} />
          <p>完全に理解した</p>
        </div>
        <div className={style.techFlex}>
          <ChipWithButtons
            id="React"
            label="React"
            leftSlot={<div></div>}
            buttonGroup={
              <>
                <ChipButton
                  target={{ key: "beginner", level: "beginner" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <FlagIcon className={`${style.active} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "advanced", level: "advanced" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <DrawIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "expert", level: "expert" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <SchoolIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "delete", level: "delete" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <DeleteIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
              </>
            }
            background="#3998B6"
          />
          <NewChip id="react">
            <FlagIcon className={style.icon} />
          </NewChip>
        </div>
      </div>
      <div className={style.techContainer}>
        <div className={style.techTitle}>
          <DrawIcon className={style.icon} />
          <p>なんもわからん</p>
        </div>
        <div className={style.techFlex}>
          <ChipWithButtons
            id="React"
            label="React"
            leftSlot={<div></div>}
            buttonGroup={
              <>
                <ChipButton
                  target={{ key: "beginner", level: "beginner" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <FlagIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "advanced", level: "advanced" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <DrawIcon className={`${style.active} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "expert", level: "expert" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <SchoolIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "delete", level: "delete" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <DeleteIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
              </>
            }
            background="#3998B6"
          />
          <NewChip id="react">
            <DrawIcon className={style.icon} />
          </NewChip>
        </div>
      </div>
      <div className={style.techContainer}>
        <div className={style.techTitle}>
          <SchoolIcon className={style.icon} />
          <p>ﾁｮｯﾄﾃﾞｷﾙ</p>
        </div>
        <div className={style.techFlex}>
          <ChipWithButtons
            id="React"
            label="React"
            leftSlot={<div></div>}
            buttonGroup={
              <>
                <ChipButton
                  target={{ key: "beginner", level: "beginner" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <FlagIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "advanced", level: "advanced" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <DrawIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "expert", level: "expert" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <SchoolIcon className={`${style.active} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "delete", level: "delete" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <DeleteIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
              </>
            }
            background="#3998B6"
          />
          <NewChip id="react">
            <SchoolIcon className={style.icon} />
          </NewChip>
        </div>
      </div>
      <div className={style.techContainer}>
        <div className={style.techTitle}>
          <SuggestIcon className={style.icon} />
          <p>この技術はいかがですか？</p>
        </div>
        <div className={style.techFlex}>
          <ChipWithButtons
            id="React"
            label="React"
            leftSlot={<div></div>}
            buttonGroup={
              <>
                <ChipButton
                  target={{ key: "beginner", level: "beginner" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <FlagIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "advanced", level: "advanced" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <DrawIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
                <ChipButton
                  target={{ key: "expert", level: "expert" }}
                  className={style.buttonReset}
                  onClick={() => console.log("clicked!")}
                >
                  <SchoolIcon className={`${style.icon} ${style.button}`} />
                </ChipButton>
              </>
            }
            background="#3998B6"
          />
        </div>
      </div>
      <div>
        <div className={style.buttonContainer}>
          <button className={style.undo}>変更を戻す</button>
          <button className={style.save}>変更を保存</button>
        </div>
      </div>
    </div>
  );
};
