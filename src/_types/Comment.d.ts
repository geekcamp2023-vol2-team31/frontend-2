export type ICommentType = "problem" | "goal" | "solution";

export type IComment<T extends ICommentType = ICommentType> = {
  id: number;
  body: string;
  type: T;
};

export type ICommentsData = {[key in ICommentType]:IComment[]}