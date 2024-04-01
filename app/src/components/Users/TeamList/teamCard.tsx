import React from "react";
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

interface Props {
  // props here
}

// 仮のチームデータ
const teams = [
  {
    id: 1,
    name: "チーム１",
    memberCount: 5,
    description: "データ分析と機械学習に特化したチームです。",
  },
  {
    id: 2,
    name: "チーム２",
    memberCount: 4,
    description:
      "フロントエンドの開発とユーザーインターフェースのデザインを行います。",
  },
  {
    id: 3,
    name: "チーム３",
    memberCount: 6,
    description: "バックエンドシステムの構築と保守を担当しています。",
  },
];

const TeamCard: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <List>
      {teams.map((team) => (
        <ListItem key={team.id} sx={{ mb: 2 }}>
          <Card variant="soft" sx={{ width: "100%" }}>
            <Typography level="h3" sx={{ m: 2 }}>
              {team.name}
            </Typography>
            <Divider inset="none" />
            <Typography level="body-sm" sx={{ m: 2 }}>
              {team.description}
            </Typography>
            <Divider inset="none" />
            <CardActions>
              <Stack
                direction={"row"}
                alignItems={"start"}
                spacing={2}
                sx={{ mr: "auto" }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <GroupRoundedIcon />
                  <Typography level="body-md" sx={{ ml: 1 }}>
                    {team.memberCount}
                  </Typography>
                </Box>
              </Stack>
              <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                <Avatar src="/static/images/avatar/2.jpg" />
                <Avatar src="/static/images/avatar/3.jpg" />
                <Avatar src="/static/images/avatar/4.jpg" />
                <Avatar>+1</Avatar>
              </AvatarGroup>
              <Button
                variant="soft"
                color="neutral"
                endDecorator={<KeyboardArrowRight />}
                onClick={() => router.push(`/users/${team.id}`)}
              >
                show
              </Button>
            </CardActions>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default TeamCard;
