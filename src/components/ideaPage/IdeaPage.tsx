import {useTeamLinks} from "@/hooks/useTeamLinks";
import {useTeamComments} from "@/hooks/useTeamComments";
import {IComment, ICommentsData, ICommentType} from "@/_types/Comment";
import {useMemo} from "react";
import {ILink, ILinksData} from "@/_types/Link";
import {ColumnItem} from "@/components/ideaPage/column-item/column-item";

type props = {
  teamId: string;
}

const IdeaPage = ({teamId}:props) => {
  const {
    data: originalLinksData,
    isLoading: isLinksLoading,
    setData: setLinksData,
  } = useTeamLinks(teamId);
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    setData: setComments,
  } = useTeamComments(teamId) as unknown as  {data:ICommentsData,isLoading: boolean,setData:(data:ICommentsData)=>void};//todo: hook更新後に型変換を削除
  const linksData = useMemo(()=>{
    if (!originalLinksData||!commentsData) return;
    return convertLinkData(originalLinksData,commentsData);
  },[originalLinksData,commentsData]);
  if (isCommentsLoading||isLinksLoading||!linksData||!originalLinksData||!commentsData) return <></>;

  return <div>
    {Object.keys(commentsData).map((key_)=>{
      const key = key_ as ICommentType
      const comments = commentsData[key];
      const links = linksData[key];
      const onCommentsChange = (value: IComment[]) => {
        setComments({...commentsData,[key]:value});
      }
      const onLinksChange = (items: ILink[]) => {
        for (const item of items){
          const index = originalLinksData.links.findIndex((val)=>val.id === item.id)
          originalLinksData.links[index] = {
            id: item.id,
            leftCommentId: item.left.id,
            rightCommentId: item.right.id
          };
        }
        setLinksData({...originalLinksData});
      }

      return <ColumnItem key={key} name={key} comments={comments} onCommentsChange={onCommentsChange} links={links} onLinksChange={onLinksChange}/>
    })}
  </div>;
};

const convertLinkData = (links:{links: {id: string, leftCommentId: string, rightCommentId: string}[]},comments: ICommentsData):ILinksData => {
  const result:ILinksData = {problem:[],solution:[],goal:[]}
  for (const link of links.links){
    const left = findCommentById(link.leftCommentId,comments);
    const right = findCommentById(link.rightCommentId,comments);
    if (!left||!right)continue;
    const leftIndex = comments[left.type].findIndex((val)=>val.id===left.id);
    const rightIndex = comments[right.type].findIndex((val)=>val.id===left.id);
    result[left.type].push({
      id: link.id,
      left,leftIndex,right,rightIndex
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
