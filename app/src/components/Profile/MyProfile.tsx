import * as React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

import BasicInfo from "./BasicInfo";
import { Tab, TabList, Tabs, tabClasses } from "@mui/joy";
import Introduction from "./Introduction";
import Portfolio from "./Portfolio";
import Feedback from "./Feedback";

export default function MyProfile() {
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
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        {tabIndex === 0 ? (
          <>
            <BasicInfo />
            <Introduction />
            <Portfolio />
          </>
        ) : (
          <>
            <Feedback />
          </>
        )}
      </Stack>
    </Box>
  );
}
