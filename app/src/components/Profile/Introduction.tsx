import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import { FormHelperText, Textarea } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "@/interface/types";

interface Props {
  user: User;
}

const Introduction: React.FC<Props> = (props) => {
  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">自己紹介</Typography>
      </Box>
      <Divider />
      <Stack
        sx={{
          minHeight: 100,
          my: 1,
        }}
        spacing={2}
      >
        <Typography level="body-md">{props.user.introduction}</Typography>
      </Stack>
    </Card>
  );
};

export default Introduction;
