import {IComment} from "@/_types/Comment";
import {Comment} from "./comment";

type props = {
  comments: IComment[]
  onChange: (input: IComment[]) => void
}

const CommentList = ({comments,onChange}: props) => {
  return <div>
    {comments.map((comment) => {
      return <Comment onChange={(val)=> {
        comment.body = val;
        onChange([...comments]);
      }} comment={comment} key={comment.id} />
    })}
  </div>
}

export {CommentList}