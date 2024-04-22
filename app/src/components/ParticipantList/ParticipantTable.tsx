/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

import { useRouter } from "next/router";
import { User } from "@/interface/types";
import { Avatar, Button, Chip, CircularProgress } from "@mui/joy";
import CachedIcon from "@mui/icons-material/Cached";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/state/atoms/user";
import { filterState } from "@/state/atoms/filterState";
import { Stack } from "@mui/material";

interface Props {
  participants: User[];
}

const ParticipantTable: React.FC<Props> = (props) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState<User[] | null>(userState);
  const filter = useRecoilValue(filterState);
  //ローディング中のフラグ
  const [loading, setLoading] = React.useState(false);

  const updateParticipants = async () => {
    try {
      // localStorageのuserDataを削除
      localStorage.removeItem("userData");
      setUser(null);
      setLoading(true);
      const res = await fetch("/api/fetchUser");
      const data = await res.json();
      // 3秒待機
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      setUser(data);
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(data));
      console.log("Fetched data from API and saved to localStorage:", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <React.Fragment>
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        sx={{
          marginRight: "auto",
          marginBottom: "8px",
        }}
        startDecorator={<CachedIcon />}
        onClick={updateParticipants}
      >
        <Typography level="body-xs">テーブルを更新</Typography>
      </Button>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          style={{ cursor: "pointer" }}
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 140, padding: "12px 6px" }}>名前</th>
              <th style={{ width: 140, padding: "12px 6px" }}>グループ</th>
              <th style={{ width: 140, padding: "12px 6px" }}>大学名</th>
              <th style={{ width: 140, padding: "12px 6px" }}>役割</th>
            </tr>
          </thead>
          {props.participants.length === 0 && !loading && (
            <tbody>
              <tr>
                <td colSpan={4}>
                  <Sheet
                    variant="soft"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: 100,
                      borderRadius: "sm",
                    }}
                  >
                    <Typography level="body-xs">
                      {/* 参加者がいません */}
                    </Typography>
                  </Sheet>
                </td>
              </tr>
            </tbody>
          )}
          {loading && (
            <tbody>
              <tr>
                <td colSpan={4}>
                  <Sheet
                    variant="soft"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: 100,
                      borderRadius: "sm",
                    }}
                  >
                    <CircularProgress />
                  </Sheet>
                </td>
              </tr>
            </tbody>
          )}
          <tbody>
            {props.participants.map((participant, index) => (
              <tr
                key={participant.id}
                onClick={() => router.push(`/user/${participant.id}`)}
              >
                <td>
                  <Stack direction="row" gap={1} alignItems="center">
                    <Avatar
                      variant="soft"
                      src={participant.slack_icon_url}
                      sx={{ marginLeft: "8px" }}
                      size="sm"
                    />
                    <Typography level="body-xs">{participant.name}</Typography>
                  </Stack>
                </td>
                <td>
                  <Typography level="body-xs">
                    {participant.group_id}
                  </Typography>
                </td>
                {/* <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        index % 2 !== 1 ? <CheckRoundedIcon /> : <BlockIcon />
                      }
                      color={index % 2 !== 1 ? "success" : "danger"}
                    >
                      {index % 2 !== 1 ? "参加" : "欠席"}
                    </Chip>
                  </td> */}
                <td>
                  <Typography level="body-xs">
                    {participant.university_name}
                  </Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    // startDecorator={<MilitaryTechRoundedIcon />}
                    color="primary"
                    sx={{
                      display: participant.role ? "flex" : "none",
                    }}
                  >
                    {participant.role}
                  </Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
};

export default ParticipantTable;
