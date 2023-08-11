import {atom} from "jotai";
import {IWrapperPosition} from "@/_types/Link";

export const WrapperPositionAtom = atom<IWrapperPosition>({problem: {left:0,right:0},goal:{left:0,right:0},solution:{left:0,right:0}});