import {IComment} from "@/_types/Comment";
import {ChangeEvent} from "react";
import {ElementHeightsAtom} from "@/store/comments";
import {useSetAtom} from "jotai";

type props = {
  comment: IComment
  onChange: (value: string) => void;
}
const FONT_SIZE = 20;
const LINE_HEIGHT = 1.5;

const Comment = ({comment}: props) => {
  const setElementsHeight = useSetAtom(ElementHeightsAtom)
  const height = getLineHeight(comment.body);
  
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const body = e.target.value;
    setElementsHeight((prev) => ({
      ...prev,
      [comment.id]: getLineHeight(body)
    }));
  }
  
  return <div>
    <textarea onChange={onChange} value={comment.body} style={{
    fontSize: FONT_SIZE,
    lineHeight: LINE_HEIGHT,
    height: `${height}px`,
  }}/>
  </div>
}

const getLineHeight= (input: string) => {
  const lineCount = `${input??""}`.split("\n").length + 1;
  return lineCount * LINE_HEIGHT * FONT_SIZE;
}

export {Comment}