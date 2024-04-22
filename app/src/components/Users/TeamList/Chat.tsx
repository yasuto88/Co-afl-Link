import * as React from "react";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/joy";
import { Message, Team } from "@/interface/types";
import ChatBubble from "./ChatBubble";
type Props = {
  team: Team;
};

export default function Chat(props: Props): React.JSX.Element {
  const [chatData, setChatData] = React.useState<Message[]>([]);
  React.useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await fetch("/Message.json");
        const allChats: Message[] = await response.json();
        const relevantChats = allChats.filter((chat) =>
          props.team.message_ids.includes(chat.id)
        );
        setChatData(relevantChats);
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
        {chatData.map((message: Message, index: number) => {
          return (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              flexDirection={"row"}
            >
              <ChatBubble message={message} />
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
