import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  List,
  ListItem,
  ListItemButton,
  Sheet,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import {
  Face,
  Launch,
  Face2,
  Face3,
  Face4,
  Face5,
  Face6,
  Group,
} from "@mui/icons-material";

type IconKey =
  | "face"
  | "face2"
  | "face3"
  | "face4"
  | "face5"
  | "face6"
  | "group";

const icons = {
  face: <Face sx={{ fontSize: "2.5rem" }} />,
  face2: <Face2 sx={{ fontSize: "2.5rem" }} />,
  face3: <Face3 sx={{ fontSize: "2.5rem" }} />,
  face4: <Face4 sx={{ fontSize: "2.5rem" }} />,
  face5: <Face5 sx={{ fontSize: "2.5rem" }} />,
  face6: <Face6 sx={{ fontSize: "2.5rem" }} />,
  group: <Group sx={{ fontSize: "2.5rem" }} />,
};

function linkify(text: string) {
  const urlRegex =
    /(\bhttps?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  return text.split(urlRegex).map((part, i) =>
    urlRegex.test(part) ? (
      <Link
        href={part}
        key={i}
        target="_blank"
        rel="noopener noreferrer"
        startDecorator={<Launch />}
      >
        {part}
      </Link>
    ) : (
      part
    )
  );
}

interface Props {
  // props here
}

const MessageBoardPage: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconKey>("face");

  const handleIconChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as IconKey; // 型アサーションを使用
    setSelectedIcon(value);
  };

  const messages = [
    {
      sender: "運営チーム",
      icon: "face",
      date: "2021/10/10 10:10",
      title: "🚀 ハッカソン開催のお知らせ 🚀",
      body: "皆様、ご期待に応え新たなハッカソンを開催いたします！このイベントは、技術愛好者が一堂に会し、創造性とイノベーションを競い合う場です。日時：XXXX年XX月XX日、場所：[オンライン/特定の会場]。今回のテーマは「XXXX」。参加者は個人またはチームで参加可能です。最優秀作品には豪華な賞品が授与されます。詳細と参加登録はこちらのリンクから：[ウェブサイトのURL]。皆様の挑戦を心よりお待ちしております！",
    },
    {
      sender: "チーム１",
      icon: "group",
      date: "2021/10/10 10:10",
      title: "🌍 EcoTech Innovations プロジェクトのご紹介 🌍",
      body: "皆さん、こんにちは！私の名前は松田悠希です。今回のハッカソンで発表予定のプロジェクトについて、皆さんに先駆けて概要を共有したいと思います。私たちのプロジェクトは「EcoTech Innovations」と題して、持続可能な技術を通じて環境問題に取り組むことを目指しています。発表では、このプロジェクトがどのようにして環境保護の新しいアプローチを提案するのか、技術的詳細と共に解説します。資料は事前に以下のリンクで共有していますので、ご関心のある方はぜひご覧ください：http://ecotech-innovations-demo.com発表当日は、皆さんからの質問や意見をお待ちしております！",
    },
    {
      sender: "株式会社 ABC",
      icon: "face6",
      date: "2021/10/10 10:10",
      title: "📢 EcoTech Innovationsプロジェクトへの審査員フィードバック 📢",
      body: "皆さん、こんにちは。私は審査員の一員として、「EcoTech Innovations」プロジェクトを拝見させていただきました。まず、持続可能な技術を通じた環境問題へのアプローチに深い感銘を受けました。プロジェクトチームが示した情熱とイノベーションの精神は、この分野でのさらなる探求と発展のための素晴らしい基盤を築いています。",
    },
  ];
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [comment, setComment] = React.useState("");

  const [data, setData] = React.useState(messages);
  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          maxWidth: "100%",
          mx: "auto",
          mb: 4,
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <CardContent
          sx={{
            // display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          <Stack direction={"row"} alignItems={"end"} gap={4}>
            <Avatar
              variant="soft"
              sx={{
                borderRadius: "4px",
                width: "80px", // Avatarの幅を変更
                height: "80px", // Avatarの高さを変更
              }}
              src=""
            >
              {icons[selectedIcon]}
            </Avatar>

            <FormControl
              sx={{
                width: "100%",
                maxWidth: 320,
              }}
            >
              <FormLabel>name</FormLabel>
              <Input
                placeholder="匿名の場合、空白にしてください"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </FormControl>
          </Stack>
          <List
            orientation="horizontal"
            sx={{
              display: "flex",
              flexWrap: "wrap", // 折り返しを許可
              gap: 1,
            }}
          >
            {Object.keys(icons).map((icon) => (
              <ListItem key={icon} sx={{}}>
                <ListItemButton
                  selected={selectedIcon === icon}
                  onClick={() => setSelectedIcon(icon as IconKey)}
                  sx={{
                    borderRadius: "4px",
                    minWidth: "36px", // ListItemButtonの最小幅を設定
                    minHeight: "36px", // ListItemButtonの最小高さを設定
                    "& .MuiListItemIcon-root": {
                      // アイコンのスタイルを調整
                      minWidth: "auto", // アイコンの幅を自動に設定
                    },
                    "& svg": {
                      // SVGアイコンのスタイルを調整
                      fontSize: "1.5rem", // アイコンのフォントサイズを設定
                    },
                  }}
                >
                  {icons[icon as IconKey]}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <FormControl>
            <FormLabel>title</FormLabel>
            <Input onChange={(e) => setTitle(e.target.value)} value={title} />
          </FormControl>
          <Textarea
            size="sm"
            minRows={4}
            sx={{ mt: 1.5, gridColumn: "1/-1" }}
            placeholder=""
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
            {comment.length}/500
          </FormHelperText>
          <CardActions>
            <Button
              variant="solid"
              color="primary"
              onClick={() => {
                setData([
                  ...data,
                  {
                    sender: name === "" ? "匿名" : name,
                    icon: selectedIcon,
                    date: new Date().toLocaleString(),
                    title: title,
                    body: comment,
                  },
                ]);
                setName("");
                setTitle("");
                setComment("");
              }}
            >
              送信
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <Sheet
        variant="soft"
        sx={{
          p: 2,
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 4,
          borderRadius: 8,
        }}
      >
        {[...data].reverse().map((message, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{ borderRadius: 0, "--Card-radius": 0 }}
          >
            <CardContent orientation="horizontal">
              <Avatar
                variant="soft"
                sx={{
                  borderRadius: "4px",
                  width: "44px",
                  height: "44px",
                  "& svg": {
                    // SVGアイコンのスタイルを調整
                    fontSize: "1.5rem", // アイコンのフォントサイズを設定
                  },
                }}
                src=""
              >
                {icons[message.icon as IconKey]}
              </Avatar>
              <div>
                <Typography>{message.sender}</Typography>
                <Typography level="body-sm">{message.date}</Typography>
              </div>
            </CardContent>
            <CardContent sx={{ gap: 1, mt: 1 }}>
              <Typography level="title-md">{message.title}</Typography>
              <Typography level="body-sm">{linkify(message.body)}</Typography>
            </CardContent>
          </Card>
        ))}
      </Sheet>
    </Box>
  );
};

export default MessageBoardPage;
