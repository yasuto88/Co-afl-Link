/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Data, Participant } from "@/interface/types";
import { useRouter } from "next/router";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ParticipantTable() {
  const router = useRouter();
  const [order, setOrder] = React.useState<Order>("desc");
  const [participants, setParticipants] = React.useState<Participant[]>([]);

  React.useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data: Data) => {
        setParticipants(data.participants);
      })
      .catch((error) =>
        console.error("Error loading the participants:", error)
      );
  }, []);

  return (
    <React.Fragment>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
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
              <th style={{ width: 240, padding: "12px 6px" }}>参加状況</th>
              <th style={{ width: 140, padding: "12px 6px" }}>大学名</th>
            </tr>
          </thead>
          <tbody>
            {stableSort(participants, getComparator(order, "id")).map(
              (participant) => (
                <tr
                  key={participant.id}
                  onClick={() => router.push(`/user/${participant.id}`)}
                >
                  {/* -------------------------------------------------------------------------------------------- */}
                  {/* -------------------------------------------------------------------------------------------- */}
                  {/* -------------------------------------------------------------------------------------------- */}
                  <td>
                    <Typography level="body-xs">{participant.name}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {participant.group_id}
                    </Typography>
                  </td>
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        participant.check_in_status.checked_in ? (
                          <CheckRoundedIcon />
                        ) : (
                          <BlockIcon />
                        )
                      }
                      color={
                        participant.check_in_status.checked_in
                          ? "success"
                          : "danger"
                      }
                    >
                      {participant.check_in_status.checked_in ? "参加" : "欠席"}
                    </Chip>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {participant.university_name}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
