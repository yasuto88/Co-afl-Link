import * as React from "react";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/joy";
import { MessageProps } from "@/interface/types";
import ChatBubble from "./ChatBubble";
type ChatsPaneProps = {
  chats: MessageProps[];
};

export default function Chat(props: ChatsPaneProps): React.JSX.Element {
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
        {props.chats.map((message: MessageProps, index: number) => {
          const isYou = message.sender === "You";
          return (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              flexDirection={isYou ? "row-reverse" : "row"}
            >
              <ChatBubble variant={isYou ? "sent" : "received"} {...message} />
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
