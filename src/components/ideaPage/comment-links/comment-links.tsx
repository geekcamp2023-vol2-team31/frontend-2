import {ILink, ILinksData} from "@/_types/Link";
import {CommentLink} from "@/components/ideaPage/comment-links/comment-link";

type props = {
  links: ILinksData;
  onChange: (val:ILinksData) => void;
}

const CommentLinks = ({links,onChange}:props) => {
  return <>
    {links.map((link)=>{
      const onChangeHandler = (link:ILink) => {
        const index = links.findIndex((val)=>val.id === link.id)
        links[index] = link;
        onChange([...links]);
      }
      return <CommentLink key={link.id} link={link} onChange={onChangeHandler}/>
    })}
  </>
}

export {CommentLinks}