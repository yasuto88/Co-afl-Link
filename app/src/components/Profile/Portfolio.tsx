import React, { useState, KeyboardEvent } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import { IconButton, Link, List } from "@mui/joy";
import Add from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Launch } from "@mui/icons-material";
import { User } from "@/interface/types";

interface Props {
  user: User | null;
}

const Portfolio: React.FC<Props> = (props) => {
  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">ポートフォリオ</Typography>
      </Box>
      <Divider />
      <List
        sx={{
          flexDirection: "column-reverse",
        }}
      >
        {props.user?.portfolio_url?.map((url, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", marginBottom: 1 }}
          >
            <Typography level="body-md">
              <Link href={url} startDecorator={<Launch />}>
                {url}
              </Link>
            </Typography>
          </Stack>
        ))}
      </List>
    </Card>
  );
};

export default Portfolio;
