import React, { use, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Search from "./Search";
import ParticipantTable from "./ParticipantTable";
import { User } from "@/interface/types";
import { set } from "firebase/database";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userState } from "@/state/atoms/user";
import { fetchUser } from "@/state/selectors/userSelector";
import { filteredUserState } from "@/state/atoms/filteredUserState";
import { filteredUserListSelector } from "@/state/selectors/filteredUserListSelector";
import { filterState } from "@/state/atoms/filterState";

interface UsersObject {
  [key: string]: User;
}

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<User[]>([]);
  // userStateからユーザーの状態を取得
  // const user = useRecoilValue(fetchUser);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       console.log("Fetching users...");
  //       const res = await fetch("/api/fetchUser");
  //       const data = await res.json();
  //       setParticipants(data);
  //       console.log(data); // 状態更新前に取得したデータをログ出力
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []); // 依存配列を空にして無限ループを防ぐ
  const [user, setUser] = useRecoilState<User[] | null>(userState);
  const [filteredUser, setFilteredUser] = useRecoilState(filteredUserState);
  const filterResults = useRecoilValue(filteredUserListSelector);
  const [filter, setFilter] = useRecoilState(filterState);

  useEffect(() => {
    const loadData = async () => {
      // ローカルストレージからのデータ読み込みを試みる
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        // ローカルストレージにデータが存在する場合は、それをパースしてセットする
        const userData = JSON.parse(storedUserData);
        setUser(userData);
        console.log("Loaded data from localStorage:", userData);
      } else {
        // ローカルストレージにデータが存在しない場合は、APIからデータをフェッチしてセットする
        try {
          const res = await fetch("/api/fetchUser");
          const data = await res.json();
          setUser(data);
          // フェッチしたデータをローカルストレージにも保存
          localStorage.setItem("userData", JSON.stringify(data));
          console.log("Fetched data from API and saved to localStorage:", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    loadData();
    setFilteredUser(user);
    setFilter({ name: "", universityName: "", groupName: "" });
  }, []);

  useEffect(() => {
    setFilteredUser(filterResults);
  }, [user, filter]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        bgcolor: "background.paper",
        pt: 2, // 上部に少しパディングを追加
      }}
    >
      <Search />
      <Box sx={{ height: 16 }} />
      {filteredUser && <ParticipantTable participants={filteredUser} />}
    </Box>
  );
};

export default ParticipantList;
