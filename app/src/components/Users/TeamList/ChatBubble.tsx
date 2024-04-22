import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { Message } from "@/interface/types";

type Props = {
  message: Message;
};

export default function ChatBubble({ message }: Props) {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = React.useState<boolean>(false);
  return (
    <Box sx={{ maxWidth: "60%", minWidth: "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">{message.id}</Typography>
        <Typography level="body-xs">{message.timestamp}</Typography>
      </Stack>
      {message.attachment ? (
        <Sheet
          variant="outlined"
          sx={{
            px: 1.75,
            py: 1.25,
            borderRadius: "lg",
            borderTopRightRadius: "lg",
            borderTopLeftRadius: 0,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar color="primary" size="lg">
              <InsertDriveFileRoundedIcon />
            </Avatar>
            <div>
              <Typography fontSize="sm">
                {message.attachment.fileName}
              </Typography>
              <Typography level="body-sm">{message.attachment.size}</Typography>
            </div>
          </Stack>
        </Sheet>
      ) : (
        <Box
          sx={{ position: "relative" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Sheet
            color={"neutral"}
            variant={"soft"}
            sx={{
              p: 1.25,
              borderRadius: "lg",
              borderTopRightRadius: "lg",
              borderTopLeftRadius: 0,
              backgroundColor: "background.body",
            }}
          >
            <Typography
              level="body-sm"
              sx={{
                color: "var(--joy-palette-text-primary)",
              }}
            >
              {message.content}
            </Typography>
          </Sheet>
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction="row"
              justifyContent={"flex-start"}
              spacing={0.5}
              sx={{
                position: "absolute",
                top: "50%",
                p: 1.5,
                ...{
                  right: 0,
                  transform: "translate(100%, -50%)",
                },
              }}
            >
              <IconButton
                variant={isLiked ? "soft" : "plain"}
                color={isLiked ? "danger" : "neutral"}
                size="sm"
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? "❤️" : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton
                variant={isCelebrated ? "soft" : "plain"}
                color={isCelebrated ? "warning" : "neutral"}
                size="sm"
                onClick={() => setIsCelebrated((prevState) => !prevState)}
              >
                {isCelebrated ? "🎉" : <CelebrationOutlinedIcon />}
              </IconButton>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}
