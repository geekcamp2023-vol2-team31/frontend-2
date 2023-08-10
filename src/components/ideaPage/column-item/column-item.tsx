import {CommentList} from "@/components/ideaPage/column-item/comment-list";
import {IComment, ICommentType} from "@/_types/Comment";
import {ILink} from "@/_types/Link";
import {useEffect, useRef} from "react";
import {useSetAtom} from "jotai";
import {WrapperPositionAtom} from "@/store/links";

type props = {
  name: ICommentType
  comments: IComment[];
  onCommentsChange: (val:IComment[]) => void;
  links: ILink[];
  onLinksChange: (val:ILink[]) => void;
}

const ColumnItem = ({name,comments,onCommentsChange,links,onLinksChange}:props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setWrapperPosition = useSetAtom(WrapperPositionAtom);
  useEffect(()=>{
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setWrapperPosition((val)=>({
      ...val,
      [name]: {left:rect.left,right:rect.right}
    }))
  },[]);

  return <div ref={wrapperRef}>
    <CommentList comments={comments} onChange={onCommentsChange}/>
  </div>
}

export {ColumnItem}