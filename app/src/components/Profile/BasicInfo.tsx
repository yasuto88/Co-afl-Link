import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EditIcon from "@mui/icons-material/Edit";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import QRCode from "qrcode.react";
interface BasicInfoProps {}
const BasicInfo: React.FC<BasicInfoProps> = ({}) => {
  const [isEditing, setIsEditing] = useState(false); // 編集モードの状態

  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">基本情報</Typography>
      </Box>
      <Divider />
      {isEditing ? <EditBasicInfo /> : <DisplayBasicInfo />}
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

const EditBasicInfo: React.FC<BasicInfoProps> = (props) => {
  const name = "山田太郎";
  const hiragana = "やまだたろう";
  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
      >
        <Stack direction="column" spacing={1}>
          <QRCode
            value={"https://mui.com/"}
            size={160}
            level="H"
            includeMargin={false}
          />
        </Stack>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Stack spacing={1}>
            <FormLabel>名前</FormLabel>
            <FormControl
              sx={{
                display: { sm: "flex-column", md: "flex-row" },
                gap: 2,
              }}
            >
              <Input size="sm" placeholder={name} />
              <Input size="sm" placeholder={hiragana} sx={{ flexGrow: 1 }} />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2}>
            <FormControl>
              <FormLabel>役割</FormLabel>
              <Input size="sm" defaultValue="UI Developer" />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="email"
                defaultValue="siriwatk@test.com"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
      >
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={1}>
            <QRCode
              value={"https://mui.com/"}
              size={160}
              level="H"
              includeMargin={false}
            />
          </Stack>
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <FormLabel>名前</FormLabel>
            <FormControl
              sx={{
                display: {
                  sm: "flex-column",
                  md: "flex-row",
                },
                gap: 2,
              }}
            >
              <Input size="sm" placeholder="" />
              <Input size="sm" placeholder="ひらがな" />
            </FormControl>
          </Stack>
        </Stack>
        <FormControl>
          <FormLabel>役割</FormLabel>
          <Input size="sm" defaultValue="UI Developer" />
        </FormControl>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>Email</FormLabel>
          <Input
            size="sm"
            type="email"
            startDecorator={<EmailRoundedIcon />}
            placeholder="email"
            defaultValue="siriwatk@test.com"
            sx={{ flexGrow: 1 }}
          />
        </FormControl>
      </Stack>
    </>
  );
};

const DisplayBasicInfo: React.FC<BasicInfoProps> = (props) => {
  const name = "山田太郎";
  const hiragana = "やまだたろう";
  const role = "UI Developer";
  const email = "siriwatk@test.com";

  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
      >
        <Stack direction="column" spacing={1}>
          <QRCode
            value={"https://mui.com/"}
            size={160}
            level="H"
            includeMargin={false}
          />
        </Stack>
        <Stack>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <Typography level="body-sm" sx={{ ml: 1 }}>
                名前
              </Typography>
              <FormControl
                sx={{
                  display: { sm: "flex-column", md: "flex-row" },
                }}
              >
                <Typography>{name}</Typography>
                <Typography level="body-sm">{hiragana}</Typography>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>
              <FormControl>
                <Typography level="body-sm" sx={{}}>
                  役割
                </Typography>
                <Typography>{role}</Typography>
              </FormControl>
              <FormControl sx={{ flexGrow: 1, display: "flex" }}>
                <Typography
                  level="body-sm"
                  sx={{
                    ml: 1,
                  }}
                >
                  Email
                </Typography>
                <Typography
                  color="primary"
                  sx={{
                    ml: 1,
                  }}
                  // startDecorator={<EmailRoundedIcon color="disabled"/>}
                >
                  {email}
                </Typography>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
      >
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={1}>
            <QRCode
              value={"https://mui.com/"}
              size={160}
              level="H"
              includeMargin={false}
            />
          </Stack>
          <Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <Typography level="body-sm" sx={{ ml: 1 }}>
                  名前
                </Typography>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 1,
                  }}
                >
                  <Typography>{name}</Typography>
                  <Typography level="body-sm">{hiragana}</Typography>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl>
                  <Typography level="body-sm" sx={{}}>
                    役割
                  </Typography>
                  <Typography>{role}</Typography>
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <Typography
                    level="body-sm"
                    sx={{
                      ml: 1,
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    color="primary"
                    sx={{
                      ml: 1,
                    }}
                    // startDecorator={<EmailRoundedIcon color="disabled"/>}
                  >
                    {email}
                  </Typography>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default BasicInfo;
