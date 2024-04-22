import { selector } from "recoil";
import { filterState } from "../atoms/filterState";
import { userState } from "../atoms/user";

// 絞り込み条件に一致するユーザーリストを返すセレクタ
export const filteredUserListSelector = selector({
  key: "filteredUserListSelector",
  get: ({ get }) => {
    const filter = get(filterState);
    const users = get(userState) || [];

    console.log("filter", filter);
    console.log("users", users);

    if (!users) return [];

    return users.filter((user) => {
      const nameMatch =
        filter.name === "" ||
        user.name.toLowerCase().includes(filter.name.toLowerCase()) ||
        user.name_kana.toLowerCase().includes(filter.name.toLowerCase());

      const universityNameMatch =
        filter.universityName === "" ||
        user.university_name
          .toLowerCase()
          .includes(filter.universityName.toLowerCase());

      const groupNameMatch =
        filter.groupName === "" ||
        user.group_id?.toLowerCase().includes(filter.groupName.toLowerCase());

      return nameMatch && universityNameMatch && groupNameMatch;
    });
  },
});
