import { FlagIcon } from "@/assets/flagIcon";
import style from "./TechProfileEditor.module.scss";
import { FC, useEffect, useState } from "react";
import { ChipWithButtons } from "@/components/teams/ChipWithButtons";
import { ChipButton } from "@/components/teams/ChipButton/ChipButton";
import { DrawIcon } from "@/assets/drawIcon";
import { SchoolIcon } from "@/assets/schoolIcon";
import { DeleteIcon } from "@/assets/deleteIcon";
import { NewChip } from "@/components/teams/NewChip/NewChip";
import { SuggestIcon } from "@/assets/suggest";
import { requests } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";

interface ITech {
  name: string;
  level: "beginner" | "advanced" | "expert";
}

// TODO: 型リポジトリが決定次第合わせる
interface IUsersMe {
  user: {
    id: string;
    techs: ITech[];
  };
}

// TODO: バックエンドから取得する可能性あり
const recommendedTechs: string[] = [
  "JavaScript",
  "C++",
  "Rust",
  "Go",
  "TypeScript",
  "Ruby",
  "Rails",
  "Python",
  "Vue",
  "React",
];

export const TechProfileEditor: FC = () => {
  const [techs, setTechs] = useState<ITech[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => requests<IUsersMe>("/users/me"),
  });

  const putUsersMe = (body: { user: Partial<IUsersMe["user"]> }) => {
    return requests("/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const mutation = useMutation(putUsersMe);
  const onSubmit = () => {
    mutation.mutate({
      user: {
        techs,
      },
    });
  };

  const setTech = (
    tech: string,
    level: "beginner" | "advanced" | "expert" | "delete"
  ) => {
    if (tech === "") {
      return;
    }
    if (level === "delete") {
      setTechs((techs) => techs.filter((t) => t.name !== tech));
    } else {
      if (techs.some((t) => t.name === tech)) {
        // 移動するケース
        setTechs((techs) =>
          techs.map((t) => (t.name === tech ? { name: tech, level } : t))
        );
      } else {
        // 追加するケース
        setTechs((techs) => [...techs, { name: tech, level }]);
      }
    }
  };

  const resetInput = () => {
    if (!data) return;
    setTechs(data.user.techs);
  };

  useEffect(() => {
    if (!data) return;
    setTechs(data.user.techs);
  }, [data]);

  if (isLoading) {
    return null;
  }
  // おすすめの技術のうち、userが選択していないもの
  const recommendedTechsToShow = recommendedTechs.filter(
    (tech) => !techs.some((t) => t.name === tech)
  );
  return (
    <div className={style.container}>
      <h1 className={style.title}>技術スタック</h1>
      <p className={style.description}>
        あなたのチームのメンバーに、あなたの技術スタックを教えることができます。チャレンジする技術を決めるときの参考になります。
      </p>
      {(
        [
          { label: "完全に理解した", level: "beginner" },
          { label: "なんもわからん", level: "advanced" },
          { label: "ﾁｮｯﾄﾃﾞｷﾙ", level: "expert" },
        ] as const
      ).map(({ label, level }) => (
        <div key={level} className={style.techContainer}>
          <div className={style.techTitle}>
            {level === "beginner" ? (
              <FlagIcon className={style.icon} />
            ) : level === "advanced" ? (
              <DrawIcon className={style.icon} />
            ) : (
              <SchoolIcon className={style.icon} />
            )}
            <p>{label}</p>
          </div>
          <div className={style.techFlex}>
            {techs
              .filter((tech) => tech.level === level)
              .map((tech) => (
                <ChipWithButtons
                  key={tech.name}
                  id={tech.name}
                  label={tech.name}
                  leftSlot={<div></div>}
                  buttonGroup={
                    <>
                      <ChipButton
                        target={{ key: tech.name, level: "beginner" }}
                        className={style.buttonReset}
                        onClick={({ target: { key } }) =>
                          setTech(key, "beginner")
                        }
                      >
                        <FlagIcon
                          className={`${
                            level === "beginner" ? style.active : style.icon
                          } ${style.button}`}
                        />
                      </ChipButton>
                      <ChipButton
                        target={{ key: tech.name, level: "advanced" }}
                        className={style.buttonReset}
                        onClick={({ target: { key } }) =>
                          setTech(key, "advanced")
                        }
                      >
                        <DrawIcon
                          className={`${
                            level === "advanced" ? style.active : style.icon
                          } ${style.button}`}
                        />
                      </ChipButton>
                      <ChipButton
                        target={{ key: tech.name, level: "expert" }}
                        className={style.buttonReset}
                        onClick={({ target: { key } }) =>
                          setTech(key, "expert")
                        }
                      >
                        <SchoolIcon
                          className={`${
                            level === "expert" ? style.active : style.icon
                          } ${style.button}`}
                        />
                      </ChipButton>
                      <ChipButton
                        target={{ key: tech.name, level: "delete" }}
                        className={style.buttonReset}
                        onClick={({ target: { key } }) =>
                          setTech(key, "delete")
                        }
                      >
                        <DeleteIcon
                          className={`${style.icon} ${style.button}`}
                        />
                      </ChipButton>
                    </>
                  }
                  background="#3998B6"
                />
              ))}
            <NewChip
              id={level}
              onEnter={({ label }) => {
                setTech(label, level);
              }}
            >
              {level === "beginner" ? (
                <FlagIcon className={style.icon} />
              ) : level === "advanced" ? (
                <DrawIcon className={style.icon} />
              ) : (
                <SchoolIcon className={style.icon} />
              )}
            </NewChip>
          </div>
        </div>
      ))}
      <div className={style.techContainer}>
        <div className={style.techTitle}>
          <SuggestIcon className={style.icon} />
          <p>この技術はいかがですか？</p>
        </div>
        <div className={style.techFlex}>
          {recommendedTechsToShow.map((techName) => (
            <ChipWithButtons
              key={techName}
              id={techName}
              label={techName}
              leftSlot={<div></div>}
              buttonGroup={
                <>
                  <ChipButton
                    target={{ key: techName, level: "beginner" }}
                    className={style.buttonReset}
                    onClick={({ target: { key } }) => setTech(key, "beginner")}
                  >
                    <FlagIcon className={`${style.icon} ${style.button}`} />
                  </ChipButton>
                  <ChipButton
                    target={{ key: techName, level: "advanced" }}
                    className={style.buttonReset}
                    onClick={({ target: { key } }) => setTech(key, "advanced")}
                  >
                    <DrawIcon className={`${style.icon} ${style.button}`} />
                  </ChipButton>
                  <ChipButton
                    target={{ key: techName, level: "expert" }}
                    className={style.buttonReset}
                    onClick={({ target: { key } }) => setTech(key, "expert")}
                  >
                    <SchoolIcon className={`${style.icon} ${style.button}`} />
                  </ChipButton>
                </>
              }
              background="#3998B6"
            />
          ))}
        </div>
      </div>
      <div>
        <div className={style.buttonContainer}>
          <button className={style.undo} onClick={resetInput}>
            変更を戻す
          </button>
          <button className={style.save} onClick={onSubmit}>
            変更を保存
          </button>
        </div>
      </div>
    </div>
  );
};
