import {useTeamLinks} from "@/hooks/useTeamLinks";
import {useTeamComments} from "@/hooks/useTeamComments";
import {IComment, ICommentsData, ICommentType} from "@/_types/Comment";
import {CommentList} from "@/components/ideaPage/comment-list";

type props = {
  teamId: string;
}

const IdeaPage = ({teamId}:props) => {
  const {
    data: linksData,
    isLoading: isLinksLoading,
    setData: setLinksData,
  } = useTeamLinks(teamId);
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    setData: setComments,
  } = useTeamComments(teamId) as unknown as  {data:ICommentsData,isLoading: boolean,setData:(data:ICommentsData)=>void};//todo: hook更新後に型変換を削除

  if (isCommentsLoading||isLinksLoading||!linksData ||!commentsData) return <></>;

  return <div>
    {Object.keys(commentsData).map((key)=>{
      const comments = commentsData[(key as ICommentType)];
      const onChange = (value: IComment[]) => {
        setComments({...commentsData,[key]:value});
      }
      return <div key={key}>
        <CommentList comments={comments} onChange={onChange}/>
      </div>
    })}
  </div>;
};

export { IdeaPage };
