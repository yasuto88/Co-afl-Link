import * as React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

import BasicInfo from "./BasicInfo";
import {
  Card,
  CardContent,
  Skeleton,
  Tab,
  TabList,
  Tabs,
  tabClasses,
} from "@mui/joy";
import Introduction from "./Introduction";
import Portfolio from "./Portfolio";
import Feedback from "./Feedback";
import { User } from "@/interface/types";

interface Props {
  user: User | null;
}

export default function MyProfile({ user }: Props) {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          // zIndex: 9995,
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
              borderRadius: "6px 6px 0 0",
            }}
          >
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              profile
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={1}>
              feedbacks
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
          px: { xs: 0, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        {tabIndex === 0 ? (
          user ? (
            <>
              <BasicInfo user={user} />
              <Introduction user={user} />
              <Portfolio user={user} />
            </>
          ) : (
            <Card variant="outlined">
              <CardContent orientation="horizontal">
                <Skeleton variant="circular" width={120} height={120} />
                <Stack>
                  <Skeleton variant="text" width={100} />
                  <Skeleton level="body-sm" variant="text" width={200} />
                </Stack>
              </CardContent>
              <CardContent sx={{ gap: 0.5, mt: 1 }}>
                <Skeleton level="h3" variant="text" width="40%" />
                <Skeleton level="body-xs" variant="text" width="99%" />
                <Skeleton level="body-lg" variant="text" width="30%" />
                <Skeleton level="body-xs" variant="text" width="80%" />
              </CardContent>
            </Card>
          )
        ) : (
          user && <Feedback user={user} />
        )}
      </Stack>
    </Box>
  );
}
