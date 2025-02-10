import { atom } from "recoil";
import { Step } from "@/types";

export const stepsState = atom<Step[]>({
  key: "stepsState",
  default: [], 
});


