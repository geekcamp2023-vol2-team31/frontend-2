import {IComment, ICommentType} from "@/_types/Comment";

export type ILink = {
  id: string;
  left: IComment;
  leftIndex: number;
  right: IComment;
  rightIndex: number;
}

export type ILinksData = {[key in ICommentType]:ILink[]}