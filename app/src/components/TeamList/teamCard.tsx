import React, { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Box,
  Button,
  CardActions,
  Divider,
  List,
  ListItem,
  Typography,
  Avatar,
  AvatarGroup,
} from "@mui/joy";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/router";
import { Team, User } from "@/interface/types";

interface Props {
  teams: Team[];
}

const TeamCard: React.FC<Props> = ({ teams }) => {
  const router = useRouter();
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData: User[] = JSON.parse(storedUserData);
      setUsersData(userData);
    }
  }, []);

  // ユーザーIDからアバターURLを取得
  const getUserAvatarUrl = (userId: string): string => {
    const user = usersData.find((user) => user.id === userId);
    return user?.slack_icon_url || "";
  };

  return (
    <List>
      {teams.map((team: Team) => (
        <ListItem key={team.id} sx={{ mb: 2 }}>
          <Card variant="soft" sx={{ width: "100%" }}>
            <Typography level="h3" sx={{ m: 2 }}>
              {team.name}
            </Typography>
            <Divider inset="none" />
            <CardActions>
              <Stack direction="row" alignItems="start" spacing={2} sx={{ mr: "auto" }}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <GroupRoundedIcon />
                  <Typography level="body-md" sx={{ ml: 1 }}>
                    {team.member_ids.length}
                  </Typography>
                </Box>
              </Stack>
              <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                {team.member_ids.slice(0, 3).map((member) => (
                  <Avatar key={member} src={getUserAvatarUrl(member)} />
                ))}
                {team.member_ids.length > 3 && (
                  <Avatar>+{team.member_ids.length - 3}</Avatar>
                )}
              </AvatarGroup>
              <Button
                variant="soft"
                color="neutral"
                endDecorator={<KeyboardArrowRight />}
                onClick={() => router.push(`/teams/${team.id}`)}
              >
                Show
              </Button>
            </CardActions>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default TeamCard;
