import {useTeamLinks} from "@/hooks/useTeamLinks";
import {useTeamComments} from "@/hooks/useTeamComments";
import {IComment, ICommentsData, ICommentType} from "@/_types/Comment";
import {useMemo} from "react";
import { ILinksData, IWrapperPosition} from "@/_types/Link";
import {ColumnItem} from "@/components/ideaPage/column-item";
import {useAtomValue} from "jotai";
import {ElementHeightsAtom} from "@/store/comments";
import {WrapperPositionAtom} from "@/store/links";
import {CommentLinks} from "@/components/ideaPage/comment-links";

type props = {
  teamId: string;
}

const IdeaPage = ({teamId}:props) => {
  const {
    data: originalLinksData,
    isLoading: isLinksLoading,
    setData: setOriginalLinksData,
  } = useTeamLinks(teamId);
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    setData: setComments,
  } = useTeamComments(teamId) as unknown as  {data:ICommentsData,isLoading: boolean,setData:(data:ICommentsData)=>void};//todo: hook更新後に型変換を削除
  const elementHeights = useAtomValue(ElementHeightsAtom);
  const wrapperPosition = useAtomValue(WrapperPositionAtom);
  const linksData = useMemo(()=>{
    if (!originalLinksData||!commentsData) return;
    return convertLinkData(originalLinksData,commentsData,elementHeights,wrapperPosition);
  },[originalLinksData,commentsData,elementHeights,wrapperPosition]);
  if (isCommentsLoading||isLinksLoading||!linksData||!originalLinksData||!commentsData) return <></>;

  const setLinksData = (val:ILinksData) => {
    setOriginalLinksData({links:val.map((item)=>({
        id: item.id,
        leftCommentId: item.left.id,
        rightCommentId: item.right.id,
      }))})
  }

  return <div>
    {Object.keys(commentsData).map((key_)=>{
      const key = key_ as ICommentType
      const comments = commentsData[key];
      const onCommentsChange = (value: IComment[]) => {
        setComments({...commentsData,[key]:value});
      }

      return <ColumnItem key={key} name={key} comments={comments} onCommentsChange={onCommentsChange} />
    })}
    <CommentLinks links={linksData} onChange={setLinksData}/>
  </div>;
};

const convertLinkData = (links:{links: {id: string, leftCommentId: string, rightCommentId: string}[]},comments: ICommentsData, elementHeights:Record<string, number>,wrapperPosition: IWrapperPosition):ILinksData => {
  const result:ILinksData = []
  for (const link of links.links){
    const left = findCommentById(link.leftCommentId,comments);
    const right = findCommentById(link.rightCommentId,comments);
    if (!left||!right)continue;
    const leftIndex = comments[left.type].findIndex((val)=>val.id===left.id);
    const rightIndex = comments[right.type].findIndex((val)=>val.id===left.id);
    const leftHeight = comments[left.type].slice(0,leftIndex).reduce((pv,comment)=>{
      return pv + (elementHeights[comment.id]??0)
    },0);
    const rightHeight = comments[right.type].slice(0,leftIndex).reduce((pv,comment)=>{
      return pv + (elementHeights[comment.id]??0)
    },0);
    const leftX = wrapperPosition[left.type].right;
    const rightX = wrapperPosition[right.type].left;
    result.push({
      id: link.id,
      left,leftIndex,right,rightIndex,leftHeight,rightHeight,leftX,rightX
    })
  }
  return result;
}

const findCommentById = (targetId: string,comments:ICommentsData) => {
  for (const list of Object.values(comments)){
    for (const item of list){
      if (item.id === targetId) return item;
    }
  }
  return undefined
}

export { IdeaPage };
