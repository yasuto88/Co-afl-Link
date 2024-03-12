import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { Participant, Data } from "../../interface/types";

const ParticipantTable: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data: Data) => {
        setParticipants(data.participants);
      })
      .catch((error) =>
        console.error("Error loading the participants:", error)
      );
  }, []);

  const handleRowClick = (participantId: string) => {
    // user/[userId].tsx に遷移する
    window.location.href = `/user/${participantId}`;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "80%", maxWidth: 720, margin: "auto", mt: 2, mb: 2 }}
    >
      <Table aria-label="participant table">
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            <TableCell align="right">大学名</TableCell>
            <TableCell align="right">グループ名</TableCell>
            <TableCell align="right">参加状況</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow
              key={participant.id}
              hover
              onClick={() => handleRowClick(participant.id)}
              style={{ cursor: "pointer" }}
            >
              <TableCell>{participant.name}</TableCell>
              <TableCell align="right">{participant.university_name}</TableCell>
              <TableCell align="right">{participant.group_id}</TableCell>
              <TableCell align="right">
                {participant.check_in_status.checked_in ? <CheckIcon /> : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParticipantTable;
