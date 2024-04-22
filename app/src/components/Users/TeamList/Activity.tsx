import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  Sheet,
  Typography,
} from "@mui/joy";
import React, { use, useEffect, useState } from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import { Team, User } from "@/interface/types";
import type { Activity } from "@/interface/types";

interface Props {
  team: Team;
}

const Activity: React.FC<Props> = ({ team }) => {
  const [activity, setActivity] = useState<
    {
      user: User;
      activities: Activity[];
    }[]
  >([]);

  useEffect(() => {
    const fetchMembersAndActivities = async () => {
      // ユーザーデータとアクティビティデータの取得
      // const userResponse = await fetch("/User.json");
      // const users: User[] = await userResponse.json();
      const activityResponse = await fetch("/Activity.json");
      const allActivities: Activity[] = await activityResponse.json();

      // team.member_ids に含まれる各メンバーIDに対応するユーザーとアクティビティを検索
      const memberActivitiesPromise: Promise<
        {
          user: User;
          activities: Activity[];
        }[]
      > = Promise.all(
        team.member_ids?.map(async (memberId) => {
          console.log(memberId);
          const user = await fetch(`/api/user/${memberId}`);
          const data: User = await user.json();
          const userActivities = allActivities.filter((activity) =>
            data?.activity_ids?.includes(activity.id)
          );

          return { user: data || ({} as User), activities: userActivities };
        }) || []
      );
      // console.log(memberActivitiesPromise);

      // 状態を更新
      setActivity(await memberActivitiesPromise);
    };

    fetchMembersAndActivities();
  }, [team.member_ids]);

  return (
    <List
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 2,
      }}
    >
      {activity.map((data, index) => (
        <Sheet
          key={index}
          component="li"
          variant="outlined"
          sx={{
            borderRadius: "sm",
            p: 2,
            listStyle: "none",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              variant="outlined"
              sx={{ borderRadius: "50%" }}
              src={data.user.slack_icon_url}
            />
            <div>
              <Typography level="title-md">{data.user.name}</Typography>
              <Typography level="body-xs">{data.user.role}</Typography>
            </div>
          </Box>
          <Divider component="div" sx={{ my: 2 }} />
          <Stepper
            sx={{ width: "100%", "--Step-gap": "16px" }}
            orientation="vertical"
          >
            {data.activities.map(
              (task, taskIndex) =>
                taskIndex < 3 && (
                  <Step
                    key={task.time}
                    indicator={
                      <StepIndicator color="primary">
                        <Check />
                      </StepIndicator>
                    }
                  >
                    <Typography level="title-sm">{task.description}</Typography>
                    <Typography level="body-xs">{task.time}</Typography>
                  </Step>
                )
            )}
          </Stepper>
          {data.activities.length > 2 && (
            <Button
              size="sm"
              variant="plain"
              endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
              sx={{ px: 1, mt: 1 }}
            >
              Expand
            </Button>
          )}
        </Sheet>
      ))}
    </List>
  );
};

export default Activity;
