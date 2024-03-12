import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import QRCode from "qrcode.react";
import BasicInfo from "./BasicInfo";
import EditButton from "../EditButton";

interface ProfileTopProps {
  name: string;
  university: string;
  qrCodeUrl: string;
  contact_info: string;
  group_id: string;
}

const ProfileTop: React.FC<ProfileTopProps> = ({
  name,
  university,
  qrCodeUrl,
  contact_info,
  group_id,
}) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={0} alignItems="start" flexWrap="nowrap">
        <Grid item>
          <QRCode
            value={qrCodeUrl}
            size={200}
            level="H"
            includeMargin={false}
          />
        </Grid>
        <Grid container flexDirection="row" marginLeft={4}>
          <BasicInfo
            name={name}
            university={university}
            contact_info={contact_info}
            group_id={group_id}
          />
          {/* ここにその他を表示する */}
          <EditButton />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileTop;
