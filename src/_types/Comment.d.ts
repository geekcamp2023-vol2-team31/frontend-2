export type IComment = {
  id: number;
  body: string;
  type: "problem" | "goal" | "solution";
}