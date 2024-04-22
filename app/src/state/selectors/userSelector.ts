import { selector } from "recoil";
import { userState } from "../atoms/user";
import axios from "axios";

export const fetchUser = selector({
  key: "fetchUser",
  get: async ({ get }) => {
    // サーバーサイドでの実行時はlocalStorageを使用しない
    if (typeof window === "undefined") {
      const currentUser = get(userState);
      if (currentUser !== null) return currentUser;
      // サーバーサイドでの実行時の処理（API呼び出し等）をここに記述
      // この例ではクライアントサイドでのみデータのフェッチを想定しているため、サーバーサイドでは特に処理を行わない
      return null;
    }

    // ローカルストレージからユーザーデータを取得しようと試みる
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // ローカルストレージにユーザーデータが存在する場合は、それを返す
      console.log("User data has been fetched from local storage");
      return JSON.parse(storedUserData);
    }

    // ローカルストレージにデータがない場合、APIをフェッチする
    try {
      const response = await axios.get("/api/fetchUser");
      const userData = response.data;

      // 取得したユーザーデータをローカルストレージに保存
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("User data has been fetched from API");

      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  set: ({ set }, newValue) => {
    set(userState, newValue);
    // ローカルストレージにもユーザーデータを更新
    localStorage.setItem("userData", JSON.stringify(newValue));
    console.log("User data has been updated");
    console.log(newValue);
  },
});
