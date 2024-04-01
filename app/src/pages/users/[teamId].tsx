import Files from "@/components/Users/TeamList/Files";
import { Box, Sheet, Stack, Tab, TabList, Tabs, tabClasses } from "@mui/joy";
import React from "react";

import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import DropZone from "@/components/Users/TeamList/DropZone";
import Activity from "@/components/Users/TeamList/Activity";
import Chat from "@/components/Users/TeamList/Chat";
import { MessageProps, UserProps } from "@/interface/types";

const users: UserProps[] = [
  {
    name: "Steve E.",
    username: "@steveEberger",
    avatar: "/static/images/avatar/2.jpg",
    online: true,
  },
  {
    name: "Katherine Moss",
    username: "@kathy",
    avatar: "/static/images/avatar/3.jpg",
    online: false,
  },
  {
    name: "Phoenix Baker",
    username: "@phoenix",
    avatar: "/static/images/avatar/1.jpg",
    online: true,
  },
];

const chats: MessageProps[] = [
  {
    id: "1",
    content: "Hi Olivia, I am currently working on the project.",
    timestamp: "Wednesday 9:00am",
    sender: users[0],
  },
  {
    id: "2",
    content: "I will be able to send you the files by tomorrow.",
    timestamp: "Wednesday 9:01am",
    sender: users[0],
  },
  {
    id: "3",
    content: "Great! Looking forward to it.",
    timestamp: "Wednesday 9:02am",
    sender: users[1],
  },
  {
    id: "4",
    content: "Hi Olivia, I am currently working on the project.",
    timestamp: "Wednesday 9:04am",
    sender: users[2],
    attachment: {
      fileName: "Tech design requirements.pdf",
      type: "pdf",
      size: "200 kB",
    },
  },
];

interface Props {
  chats: MessageProps[]; // propsにchatsを含める
}

const TeamInfo: React.FC<Props> = (props) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue as number)}
          sx={{ bgcolor: "transparent" }}
        >
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: "left",
              [`&& .${tabClasses.root}`]: {
                fontWeight: "600",
                flex: "initial",
                color: "text.tertiary",
                [`&.${tabClasses.selected}`]: {
                  bgcolor: "transparent",
                  color: "text.primary",
                  "&::after": {
                    height: "2px",
                    bgcolor: "primary.500",
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              activity
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={1}>
              files
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={2}>
              chat
            </Tab>
          </TabList>
        </Tabs>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        {tabIndex === 0 && <Activity />}
        {tabIndex === 1 && (
          <Stack spacing={2} sx={{ my: 1 }}>
            <DropZone />
            <Files
              icon={<InsertDriveFileRoundedIcon />}
              fileName="Tech design requirements.pdf"
              fileSize="200 kB"
              progress={100}
            />
            <Files
              icon={<VideocamRoundedIcon />}
              fileName="Dashboard prototype recording.mp4"
              fileSize="16 MB"
              progress={40}
            />
          </Stack>
        )}
        {tabIndex === 2 && <Chat chats={chats} />}
      </Stack>
    </Box>
  );
};

export default TeamInfo;
