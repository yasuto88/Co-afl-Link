import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import QRCode from "qrcode.react";
import { User } from "@/interface/types";
import {
  AspectRatio,
  Avatar,
  CardContent,
  Modal,
  ModalDialog,
  Sheet,
} from "@mui/joy";
import Image from "next/image";
import QrCodeRoundedIcon from "@mui/icons-material/QrCodeRounded";
import { useRouter } from "next/router";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Download, SchoolRounded } from "@mui/icons-material";
import FeedbackForm from "./FeedbackForm";
interface Props {
  user: User;
}
const BasicInfo: React.FC<Props> = ({ user }) => {
  const [QROpen, setQROpen] = React.useState<boolean>(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null);

  const [userIcon, setUserIcon] = useState(""); // ユーザーのアイコンURL
  const url = `${window.location.origin}${router.asPath}`;

  // useEffect(() => {
  //   const fetchUserIcon = async () => {
  //     const response = await fetch("/api/fetchIcon");
  //     const data = await response.json();
  //     if (!response.ok) {
  //       console.error("Failed to fetch user icon:", data.error);
  //       return;
  //     }
  //     setUserIcon(data.icon);
  //     console.log("User icon fetched:", data.icon);
  //   };

  //   fetchUserIcon();
  // }, []);

  const downloadQRCode = () => {
    // QRコードのcanvas要素を取得
    if (!qrRef.current) return console.error("QRコードが見つかりません");
    const canvas = qrRef.current.querySelector("canvas");
    // canvasを画像としてダウンロード
    if (!canvas) return console.error("QRコードが見つかりません");
    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    // ダウンロードリンクを生成して自動クリックさせる
    let link = document.createElement("a");
    link.download = `qr-code_${user.name}.png`;
    link.href = image;
    link.click();
  };

  return (
    <>
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          display: "flex",
          // flexDirection: { xs: "column", sm: "row" },
          flexDirection: "column",
          [`& > *`]: {
            // "--stack-point": "460px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          overflow: "auto",
          // resize: "horizontal",
        }}
      >
        <Stack flexDirection={{ xs: "column", sm: "row" }}>
          <Stack
            direction="column"
            spacing={1}
            mr={{ xs: 0, sm: 2 }}
            mb={{ xs: 2, sm: 0 }}
          >
            <AspectRatio
              ratio="1"
              maxHeight={200}
              sx={{ flex: 1, minWidth: 180, borderRadius: "4px" }}
            >
              {user.slack_icon_url ? (
                <Image
                  alt=""
                  src={user.slack_icon_url}
                  width={192}
                  height={192}
                />
              ) : (
                <Avatar sx={{ width: 192, height: 192 }} />
              )}
            </AspectRatio>
          </Stack>
          <CardContent>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography fontSize="xl">{user.name}</Typography>
              <Button
                startDecorator={<QrCodeRoundedIcon />}
                variant="soft"
                color="primary"
                onClick={() => setQROpen(true)}
              >
                QR
              </Button>
            </Stack>
            <Typography level="body-sm" textColor="text.tertiary">
              {user.name_kana}
            </Typography>
            <Sheet
              sx={{
                bgcolor: "background.level1",
                borderRadius: "sm",
                p: 1.5,
                my: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                "& > div": { flex: 1 },
              }}
              // variant="outlined"
            >
              <Typography>{user.role}</Typography>
              <Typography
                color="primary"
                sx={{}}
                startDecorator={<EmailRoundedIcon color="disabled" />}
              >
                {user.contact_info}
              </Typography>
              <Typography
                sx={{}}
                startDecorator={<SchoolRounded color="disabled" />}
              >
                <Typography level="body-sm">{user.university_name}</Typography>
                <Typography level="body-sm" ml={1}>
                  {user.faculty}
                </Typography>
                <Typography level="body-sm" ml={1}>
                  {user.department}
                </Typography>
              </Typography>
              {/* <Typography
                sx={{}}
                startDecorator={<GroupRounded color="disabled" />}
              >
                {user.group_id}
              </Typography> */}
            </Sheet>
            <Box
              sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}
              width={"100%"}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setFeedbackOpen(true)}
              >
                フィードバックを送る
              </Button>
              <Button
                variant="solid"
                color="primary"
                onClick={() => router.push(`/teams/${user.group_id}`)}
              >
                チームを見に行く
              </Button>
            </Box>
          </CardContent>
        </Stack>
      </Card>
      <Modal open={QROpen} onClose={() => setQROpen(false)}>
        <ModalDialog>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div ref={qrRef}>
              <QRCode value={url} fgColor={"#636b74"} />
            </div>
            <Button
              startDecorator={<Download />}
              color="primary"
              variant="outlined"
              onClick={downloadQRCode}
            >
              Download
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
      <Modal open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <ModalDialog>
          <FeedbackForm userId={user.id} />
        </ModalDialog>
      </Modal>
    </>
  );
};

export default BasicInfo;
