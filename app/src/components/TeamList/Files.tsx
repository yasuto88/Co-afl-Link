import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card, { CardProps } from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";

import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Stack } from "@mui/joy";
import DropZone from "./DropZone";
import { Team,File } from "@/interface/types";

interface Props {
  team: Team;
}

export default function Files({ team }: Props) {
  const [fileData, setFileData] = React.useState<File[]>([]); // 複数のファイルデータを保持するための配列に変更

  React.useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch("/file.json");
        if (!response.ok) {
          throw new Error("File data could not be fetched");
        }
        const allFiles: File[] = await response.json();

        // team.file_ids に含まれる各ファイルIDに対応するファイルデータを検索して設定
        const relevantFiles = allFiles.filter((file) =>
          team.file_ids.includes(file.id)
        );
        setFileData(relevantFiles);
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };

    fetchFileData();
  }, [team.file_ids]);

  const progress = 100;
  return (
    <Stack spacing={2} sx={{ my: 1 }}>
      <DropZone />
      {fileData.map((file) => (
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={[
            {
              gap: 1.5,
              alignItems: "flex-start",
            },
            // ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          key={file.name}
        >
          <AspectRatio
            ratio="1"
            variant="soft"
            color="neutral"
            sx={{
              minWidth: 32,
              borderRadius: "50%",
              "--Icon-fontSize": "16px",
            }}
          >
            <div>{<InsertDriveFileRoundedIcon />}</div>
          </AspectRatio>
          <CardContent>
            <Typography fontSize="sm">{file.name}</Typography>
            <Typography level="body-xs">{file.size}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LinearProgress
                color="neutral"
                value={100}
                determinate
                sx={[
                  {
                    ...(100 >= 100 && {
                      color: "var(--joy-palette-success-solidBg)",
                    }),
                  },
                ]}
              />
              <Typography fontSize="xs">{100}%</Typography>
            </Box>
          </CardContent>
          {progress >= 100 ? (
            <AspectRatio
              ratio="1"
              variant="solid"
              color="success"
              sx={{
                minWidth: 20,
                borderRadius: "50%",
                "--Icon-fontSize": "14px",
              }}
            >
              <div>
                <CheckRoundedIcon />
              </div>
            </AspectRatio>
          ) : (
            <IconButton
              variant="plain"
              color="danger"
              size="sm"
              sx={{ mt: -1, mr: -1 }}
            >
              <RemoveCircleOutlineRoundedIcon />
            </IconButton>
          )}
        </Card>
      ))}
    </Stack>
  );
}
