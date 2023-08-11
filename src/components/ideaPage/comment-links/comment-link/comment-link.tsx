import {ILink} from "@/_types/Link";
import InterelementLink from "@/components/teams/InterelementLink";

type props = {
  link: ILink;
  onChange: (val:ILink) => void;
}


const CommentLink = ({link}:props) => {
  return <InterelementLink x0={link.leftX} y0={link.leftHeight} x1={link.rightX} y1={link.rightHeight}/>
}

export {CommentLink}