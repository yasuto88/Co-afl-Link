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

interface Props {
  // props here
}

const Introduction: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [introduction, setIntroduction] = useState(
    "こんにちは！大阪国際工科専門職大学の山田太郎です"
  );
  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">自己紹介</Typography>
      </Box>
      <Divider />
      {isEditing ? (
        <Stack spacing={2} sx={{ my: 1 }}>
          <Textarea
            size="sm"
            minRows={4}
            sx={{ mt: 1.5 }}
            defaultValue={introduction}
          />
          <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
            0/500
          </FormHelperText>
        </Stack>
      ) : (
        <Stack
          sx={{
            minHeight: 100,
            my: 1,
          }}
          spacing={2}
        >
          <Typography level="body-md">{introduction}</Typography>
        </Stack>
      )}

      <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="solid"
                onClick={() => setIsEditing(false)}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="solid"
              startDecorator={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </CardActions>
      </CardOverflow>
    </Card>
  );
};

export default Introduction;
