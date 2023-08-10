import { IComment } from "@/_types/Comment";
import { ChangeEvent, useEffect, useRef } from "react";
import { ElementHeightsAtom } from "@/store/comments";
import { useSetAtom } from "jotai";

type props = {
  comment: IComment;
  onChange: (value: string) => void;
};

const Comment = ({ comment, onChange }: props) => {
  const setElementsHeight = useSetAtom(ElementHeightsAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();

    setElementsHeight((prev) => ({
      ...prev,
      [comment.id]: rect.height,
    }));
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value;
    onChange(body);
  };

  return (
    <div>
      <input type="text" value={comment.body} onChange={onChangeHandler} />
    </div>
  );
};

export { Comment };
