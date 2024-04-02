// state/userSelector.ts
import { selector } from "recoil";
import { userState } from "../atoms/user";
import axios from "axios";

export const fetchUser = selector({
  key: "fetchUser",
  get: async ({ get }) => {
    // userStateアトムの現在値を取得
    const currentUser = get(userState);

    // 既にユーザーデータがある場合は、それをそのまま返す
    if (currentUser !== null) return currentUser;

    // APIからユーザーデータを取得
    try {
      const response = await axios.post("/api/fetchUser");
    //   const userData = await response.json();

      // 取得したユーザーデータを返す
      return response.data;
    } catch (error) {
      // エラーが発生した場合は、エラーメッセージを返す
      throw error;
    }
  },

  set: ({ set }, newValue) => {
    set(userState, newValue);
    console.log("User data has been updated");
    console.log(newValue);
  },
});
