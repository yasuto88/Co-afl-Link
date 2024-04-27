import React, { useEffect } from "react";
import { Button, Sheet, Typography } from "@mui/joy";
import { useRouter } from "next/router";
import TeamCard from "@/components/TeamList/teamCard";
import { Team } from "@/interface/types";
import CachedIcon from "@mui/icons-material/Cached";

export default function TeamList() {
  const router = useRouter();
  const [teamData, setTeamData] = React.useState<Team[]>([]);
  useEffect(() => {
    const loadData = async () => {
      // ローカルストレージからのデータ読み込みを試みる
      const storedTeamData = localStorage.getItem("teamData");
      if (storedTeamData) {
        // ローカルストレージにデータが存在する場合は、それをパースしてセットする
        const teamData = JSON.parse(storedTeamData);
        setTeamData(teamData);
        console.log("Loaded data from localStorage:", teamData);
      } else {
        // ローカルストレージにデータが存在しない場合は、APIからデータをフェッチしてセットする
        try {
          const res = await fetch("api/fetchTeams");
          const data: Team[] = await res.json();
          setTeamData(data);
          // フェッチしたデータをローカルストレージにも保存
          localStorage.setItem("teamData", JSON.stringify(data));
          console.log("Fetched data from API and saved to localStorage:", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    loadData();
  }, []);

  const updateTeams = async () => {
    try {
      // localStorageのteamDataを削除
      localStorage.removeItem("teamData");
      setTeamData([]);
      const res = await fetch("api/fetchTeams");
      const data: Team[] = await res.json();
      // 3秒待機
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      setTeamData(data);
      localStorage.setItem("teamData", JSON.stringify(data));
      console.log("Fetched data from API and saved to localStorage:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Sheet sx={{ padding: 2 }}>
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        sx={{
          marginLeft: "16px",
          marginBottom: "8px",
        }}
        startDecorator={<CachedIcon />}
        onClick={updateTeams}
      >
        <Typography level="body-xs">更新</Typography>
      </Button>
      <TeamCard teams={teamData} />
    </Sheet>
  );
}
