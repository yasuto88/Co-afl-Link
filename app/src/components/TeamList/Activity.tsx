import {
  Avatar,
  Box,
  Button,
  Divider,
  Link,
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
import { useRouter } from "next/router";
import { Info } from "@mui/icons-material";

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

  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    const fetchMembersAndActivities = async () => {
      const slackResponse = await fetch(
        `/api/slack/activities/${team.slack_channel_id}`
      );
      const slackActivities: Activity[] = await slackResponse.json();

      // ユーザー情報とアクティビティを結合する
      const memberActivities: {
        user: User;
        activities: Activity[];
      }[] = await Promise.all(
        team.member_ids.map(async (memberId) => {
          const storedUserData = localStorage.getItem("userData");
          let user: User;
          if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            user = userData.find((u: User) => u.id === memberId);
          } else {
            const userResponse = await fetch(`/api/user/${memberId}`);
            user = await userResponse.json();
          }

          const userActivities = slackActivities.filter((activity) =>
            user?.activity_ids?.includes(activity.user_id)
          );

          return {
            user: user || ({} as User),
            activities: userActivities.concat(
              slackActivities.filter(
                (activity) => activity.user_id === user.slack_id
              )
            ),
          };
        })
      );

      // 状態を更新
      setActivity(memberActivities);
    };

    fetchMembersAndActivities();
  }, [team.member_ids, team.slack_channel_id]);

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
            height: "fit-content",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              variant="outlined"
              sx={{ borderRadius: "50%" }}
              src={data.user.slack_icon_url}
            />
            <div>
              <Link href={`/user/${data.user.id}`}>{data.user.name}</Link>
              <Typography level="body-xs">{data.user.role}</Typography>
            </div>
          </Box>
          <Divider component="div" sx={{ my: 2 }} />
          <Stepper
            sx={{ width: "100%", "--Step-gap": "16px" }}
            orientation="vertical"
          >
            {data.activities.length == 0 ? (
              <Typography level="body-xs" startDecorator={<Info />}>
                活動記録がまだありません
              </Typography>
            ) : isExpanded ? (
              data.activities.map((task) => (
                <Step
                  key={task.time}
                  indicator={
                    <StepIndicator color="primary">
                      <Check />
                    </StepIndicator>
                  }
                >
                  <Typography level="body-xs">{task.time}</Typography>
                  <Typography level="body-sm">{task.description}</Typography>
                </Step>
              ))
            ) : (
              data.activities.map(
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
                      <Typography level="body-xs">{task.time}</Typography>
                      <Typography level="body-sm">
                        {task.description}
                      </Typography>
                    </Step>
                  )
              )
            )}
          </Stepper>
          {data.activities.length > 3 && (
            <Button
              size="sm"
              variant="plain"
              endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
              sx={{ px: 1, mt: 1 }}
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "閉じる" : "さらに表示"}
            </Button>
          )}
        </Sheet>
      ))}
    </List>
  );
};

export default Activity;
