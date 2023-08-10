import {atom} from "jotai";
import {ICommentType} from "@/_types/Comment";

export const WrapperPositionAtom = atom<{[key in ICommentType]:{left: number,right: number}}>({problem: {left:0,right:0},goal:{left:0,right:0},solution:{left:0,right:0}});