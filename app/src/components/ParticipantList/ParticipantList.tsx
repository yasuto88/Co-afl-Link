import React, { useState } from "react";
import Box from "@mui/material/Box";
import Search from "./Search";
import ParticipantTable from "./ParticipantTable";

const ParticipantList: React.FC = () => {
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
      {/* <Box sx={{ width: "80%", maxWidth: 360 }}> */}
        {" "}
        {/* 検索バーの幅を調整 */}
        <Search />
      {/* </Box> */}
      <Box sx={{ height: 16 }} />
      <ParticipantTable />
    </Box>
  );
};

export default ParticipantList;
