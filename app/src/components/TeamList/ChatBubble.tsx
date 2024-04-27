import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { Message, User } from "@/interface/types";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import TableChartIcon from "@mui/icons-material/TableChart";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { Link } from "@mui/joy";
import { Launch } from "@mui/icons-material";

type Props = {
  message: Message;
  user: User | undefined;
};

export default function ChatBubble({ message, user }: Props) {
  const FileIcon = (type: { type: string }) => {
    console.log(type.type);
    // 画像ファイルの種類
    const imageTypes = ["png", "jpg", "jpeg", "gif"];
    // PDFファイルの種類
    const pdfType = ["pdf"];
    // 動画ファイルの種類
    const videoTypes = ["mp4", "mov", "avi"];
    const docTypes = ["doc", "docx", "odt", "pdf", "txt", "rtf"];
    const spreadsheetTypes = ["xls", "xlsx", "ods", "csv"];
    const presentationTypes = ["ppt", "pptx", "odp"];

    // どのアイコンを使用するかを決定
    if (imageTypes.includes(type.type)) {
      return <ImageIcon />;
    } else if (pdfType.includes(type.type)) {
      return <PictureAsPdfIcon />;
    } else if (videoTypes.includes(type.type)) {
      return <MovieIcon />;
    } else if (docTypes.includes(type.type)) {
      return <InsertDriveFileRoundedIcon />;
    } else if (docTypes.includes(type.type)) {
      return <DescriptionIcon />;
    } else if (spreadsheetTypes.includes(type.type)) {
      return <TableChartIcon />;
    } else if (presentationTypes.includes(type.type)) {
      return <SlideshowIcon />;
    } else {
      return <InsertDriveFileRoundedIcon />;
    }
  };

  const parseContent = (content: string) => {
    const urlPattern = /https?:\/\/[^\s]+/g; // URLを見つける正規表現
    const parts = content.split(urlPattern); // URLを区切りとしてテキストを分割
    const matches = content.match(urlPattern); // URLの配列を取得

    return parts
      .flatMap((part, index) => [
        part,
        matches && index < matches.length ? (
          <Link
            key={index}
            href={matches[index]}
            target="_blank"
            rel="noopener noreferrer"
            startDecorator={<Launch />}
          >
            {matches[index]}
          </Link>
        ) : null,
      ])
      .filter(Boolean);
  };
  return (
    <Box sx={{ maxWidth: "80%", minWidth: "auto" }}>
      <Stack
        direction="row"
        // justifyContent="space-between"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">{user?.name}</Typography>
        <Typography level="body-xs">{message.timestamp}</Typography>
      </Stack>
      {/* 折り返すようにする */}
      <Stack direction="row" spacing={1} mt={1}>
        <Avatar src={user?.slack_icon_url} size="sm" />
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
            <Stack
              direction="row"
              alignItems="center"
              flexWrap={"wrap"}
              gap={2}
            >
              {message.attachment.map((attachment, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <Avatar color="primary" size="lg">
                    <FileIcon type={attachment.type} />
                  </Avatar>
                  <div>
                    <Typography fontSize="sm">{attachment.fileName}</Typography>
                    <Typography level="body-sm">{attachment.size}</Typography>
                  </div>
                </Stack>
              ))}
            </Stack>
          </Sheet>
        ) : (
          <Box sx={{ position: "relative" }}>
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
              {message.content.split("\n").map((line, index) => (
                <Typography
                  key={index}
                  level="body-sm"
                  sx={{
                    color: "var(--joy-palette-text-primary)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {parseContent(line)}
                </Typography>
              ))}
            </Sheet>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
