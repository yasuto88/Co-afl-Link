import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Search from "./Search";
import ParticipantTable from "./ParticipantTable";

const dummyParticipants = [
  { id: 1, name: "参加者 A" },
  { id: 2, name: "参加者 B" },
  { id: 3, name: "参加者 C" },
];

const ParticipantList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredParticipants = dummyParticipants.filter((participant) =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        bgcolor: "background.paper",
        pt: 2, // 上部に少しパディングを追加
      }}
    >
      <Box sx={{ width: "80%", maxWidth: 360 }}>
        {" "}
        {/* 検索バーの幅を調整 */}
        <Search />
      </Box>
      <Box sx={{ height: 16 }} />
      <ParticipantTable />
    </Box>
  );
};

export default ParticipantList;
