import Files from "@/components/TeamList/Files";
import { Box, Stack, Tab, TabList, Tabs, tabClasses } from "@mui/joy";
import React, { useEffect } from "react";

import Activity from "@/components/TeamList/Activity";
import Chat from "@/components/TeamList/Chat";
import { Team, User } from "@/interface/types";
import { useRouter } from "next/router";

interface Props {}

const TeamInfo: React.FC<Props> = (props) => {
  const router = useRouter();
  const { teamId } = router.query;
  const [teamData, setTeamData] = React.useState<Team | null>(null);
  const [memberData, setMemberData] = React.useState<User[]>([]);
  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    if (teamId) {
      const fetchTeamData = async () => {
        const res = await fetch(`/api/team/${teamId}`);
        if (res.ok) {
          const data: Team = await res.json();
          setTeamData(data);
          console.log("Team data fetched:", data);
        } else {
          console.error("Failed to load the team data");
        }
      };
      fetchTeamData();
    }
  }, [teamId]); // 依存配列に tabIndex を含めない

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue as number)}
          sx={{ bgcolor: "transparent" }}
        >
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: "left",
              [`&& .${tabClasses.root}`]: {
                fontWeight: "600",
                flex: "initial",
                color: "text.tertiary",
                [`&.${tabClasses.selected}`]: {
                  bgcolor: "transparent",
                  color: "text.primary",
                  "&::after": {
                    height: "2px",
                    bgcolor: "primary.500",
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              activity
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={1}>
              chat
            </Tab>
          </TabList>
        </Tabs>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        {tabIndex === 0 && teamData && <Activity team={teamData} />}
        {tabIndex === 1 && teamData && <Chat team={teamData} />}
      </Stack>
    </Box>
  );
};

export default TeamInfo;
