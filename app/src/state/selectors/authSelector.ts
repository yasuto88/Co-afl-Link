import { selector } from "recoil";
import { loginAtom } from "../atoms/auth";

export const toggleLoginSelector = selector<boolean>({
    key: 'toggleLogin',
    get: ({get}) => {
      // 現在のログイン状態を取得
      const currentLoginStatus = get(loginAtom);
      // 現在の状態をそのまま返す（getのみの場合は不要だが、ロジックの説明のために記載）
      return currentLoginStatus;
    },
    set: ({get, set}) => {
      // 現在のログイン状態を取得
      const currentLoginStatus = get(loginAtom);
      // ログイン状態を反転して更新
      set(loginAtom, !currentLoginStatus);
    },
  });