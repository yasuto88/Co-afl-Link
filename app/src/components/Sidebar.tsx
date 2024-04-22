import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { closeSidebar } from "../features/utils";
import Router from "next/router";
import { Add, Create, Forum, Summarize } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import { Avatar, Stack } from "@mui/joy";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const [selected, setSelected] = React.useState(0); // 選択されたメニューアイテムを追跡

  React.useEffect(() => {
    // ページがロードされたときに選択されたメニューアイテムを更新
    const path = window.location.pathname;
    if (path === "/") {
      setSelected(0);
    } else if (path === "/teams") {
      setSelected(1);
    } else if (path === "/MessageBoardPage") {
      setSelected(4);
    }
  }, []);

  // 選択を処理する関数
  const handleSelect = (label: number) => {
    setSelected(label);
    // 画面遷移
    switch (label) {
      case 0:
        // Home
        Router.push("/");
        break;
      case 1:
        // My profile
        Router.push("/teams");
        break;
      case 2:
        // Create a new user
        break;
      case 3:
        // Dashboard
        break;
      case 4:
        // MessageBoard
        Router.push("/MessageBoardPage");
        break;
    }
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9999,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2} mb={1}>
          <Avatar src="/icon.png" sx={{ width: 48, height: 48 }} />
          <Typography level="title-lg">co-afl</Typography>
        </Stack>
        <Divider />
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme: { vars: { radius: { sm: any } } }) =>
              theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              selected={selected === 0}
              onClick={() => handleSelect(0)}
            >
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              selected={selected === 1}
              onClick={() => handleSelect(1)}
            >
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">teams</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          {/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">teams</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    selected={selected === 1}
                    onClick={() => handleSelect(1)}
                  >
                    <Summarize fontSize="small" />
                    team list
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    selected={selected === 2}
                    onClick={() => handleSelect(2)}
                  >
                    <Create fontSize="small" />
                    create team
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    selected={selected === 3}
                    onClick={() => handleSelect(3)}
                  >
                    <Add fontSize="small" />
                    add member
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}

          <ListItem>
            <ListItemButton
              selected={selected === 4}
              onClick={() => handleSelect(4)}
            >
              <Forum />
              <ListItemContent>
                <Typography level="title-sm">MessageBoard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
