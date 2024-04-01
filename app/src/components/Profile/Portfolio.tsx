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

interface Props {
  // props here
}

const Portfolio: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [portfolio, setPortfolio] = useState([
    "https://example.com",
    "https://example.com",
    "https://example.com",
  ]);
  const [newUrl, setNewUrl] = useState(""); // 新しいURLのための状態

  // テキスト入力からURLを追加
  const handleAddPortfolio = () => {
    if (newUrl !== "") {
      // 空の入力を避ける
      setPortfolio([...portfolio, newUrl]);
      setNewUrl(""); // 入力をリセット
    }
  };

  // エンターキーが押された時にリストに追加
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddPortfolio();
    }
  };

  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">ポートフォリオ</Typography>
      </Box>
      <Divider />
      <Stack spacing={2} sx={{ my: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton variant="soft" onClick={handleAddPortfolio}>
            <Add />
          </IconButton>
          <Input
            placeholder="https://example.com"
            sx={{ width: "100%" }}
            value={newUrl}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setNewUrl(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Stack>
      </Stack>
      <List
        sx={{
          flexDirection: "column-reverse",
        }}
      >
        {portfolio.map((url, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", marginBottom: 1 }}
          >
            <IconButton variant="soft">
              <EditIcon />
            </IconButton>
            <Typography level="body-md">
              <Link href={url} startDecorator={<Launch />}>
                {url}
              </Link>
            </Typography>
          </Stack>
        ))}
      </List>
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

export default Portfolio;
