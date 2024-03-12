import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from '@mui/icons-material/Group';

interface BasicInfoProps {
  name: string;
  university: string;
  contact_info: string;
  group_id: string;
}
const BasicInfo: React.FC<BasicInfoProps> = ({
  name,
  university,
  contact_info,
  group_id,
}) => {
  return (
    <Grid item xs>
      <Typography variant="h5" component="h2" gutterBottom>
        {name}
      </Typography>
      <Grid
        container
        alignItems="start"
        spacing={1}
        sx={{ color: "text.secondary" }}
      >
        <Grid item>
          <LocationOnIcon fontSize="small" />
        </Grid>
        <Grid item>
          <Typography variant="body1">{university}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="start"
        spacing={1}
        sx={{ color: "text.secondary" }}
      >
        <Grid item>
          <EmailIcon fontSize="small" />
        </Grid>
        <Grid item>
          <Link href={"#yamada@example.com"} underline="always">
            {contact_info}
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="start"
        spacing={1}
        sx={{ color: "text.secondary" }}
      >
        <Grid item>
        <GroupIcon fontSize="small"/>
        </Grid>
        <Grid item>
          <Typography variant="body1">{group_id}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BasicInfo;
