import {IComment, ICommentType} from "@/_types/Comment";

export type ILink = {
  id: string;
  left: IComment;
  leftIndex: number;
  leftHeight: number;
  leftX: number;
  right: IComment;
  rightIndex: number;
  rightHeight: number;
  rightX: number;
}

export type ILinksData = ILink[]

export type IWrapperPosition = {[key in ICommentType]:{left: number,right: number}};