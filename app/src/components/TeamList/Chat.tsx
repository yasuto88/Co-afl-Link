import * as React from "react";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import { Box, Typography } from "@mui/joy";
import { Message, Team, User } from "@/interface/types";
import ChatBubble from "./ChatBubble";

type Props = {
  team: Team;
};

export default function Chat(props: Props): React.JSX.Element {
  const [chatData, setChatData] = React.useState<Message[]>([]);
  const [userData, setUserData] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchChatData = async () => {
      try {
        // チャットデータの取得
        const response = await fetch(`/api/slack/chat/${props.team.slack_channel_id}`);
        const allChats: Message[] = await response.json();
        setChatData(allChats);

        // ユーザーデータの取得
        Promise.all(
          props.team.member_ids.map(async (memberId) => {
            const storedUserData = localStorage.getItem("userData");
            let user: User;
            if (storedUserData) {
              const userData = JSON.parse(storedUserData);
              user = userData.find((u: User) => u.id === memberId);
            } else {
              const userResponse = await fetch(`/api/user/${memberId}`);
              user = await userResponse.json();
            }
            return user;
          })
        ).then((users) => {
          setUserData(users);
        });
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();
  }, [props.team.message_ids]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        minHeight: 0,
        px: 2,
        py: 3,
        overflowY: "auto",
        flexDirection: "column-reverse",
        backgroundColor: "background.level1",
        borderRadius: "lg",
      }}
    >
      <Stack spacing={2} justifyContent="flex-end">
        {chatData.length === 0 ? (
          <Typography>チャットがありません</Typography>
        ) : (
          chatData.map((message, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              flexDirection="row"
            >
              {/* message.user_id に一致するユーザーを探して渡す */}
              <ChatBubble
                message={message}
                user={userData.find((user) => user.slack_id === message.user_id)}
              />
            </Stack>
          ))
        )}
      </Stack>
    </Box>
  );
}
