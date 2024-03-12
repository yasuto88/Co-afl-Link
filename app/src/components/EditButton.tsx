import { Box, Grid } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/joy";

interface Props {
  // props here
}

const EditButton: React.FC<Props> = (props) => {
  return (
    <Grid container xs justifyContent="center">
      <Box>
        <Button variant="soft">
          <EditIcon color="primary" />
        </Button>
      </Box>
    </Grid>
  );
};

export default EditButton;
