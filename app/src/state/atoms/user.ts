import { User } from "@/interface/types";
import { atom } from "recoil";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
