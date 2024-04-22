import { atom } from "recoil";
import { User } from "@/interface/types";

// 絞り込み条件を保持するためのatom
export const filterState = atom({
  key: "filterState", // 一意のキー
  default: {
    name: "", // 名前での絞り込み条件
    universityName: "", // 大学名での絞り込み条件
    groupName: "", // グループ名での絞り込み条件
  },
  // 更新されたらログを出力
  // effects_UNSTABLE: [
  //   ({ onSet }) => {
  //     onSet((newValue) => {
  //       console.log("filterState updated:", newValue);
  //     });
  //   },
  // ],
});
