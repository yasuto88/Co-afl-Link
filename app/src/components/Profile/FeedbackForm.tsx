import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Typography,
} from "@mui/joy";
import React from "react";

interface Props {
  // props here
}

const FeedbackForm: React.FC<Props> = (props) => {
  const [name, setName] = React.useState("");
  const [feedback, setFeedback] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [comment, setComment] = React.useState("");
  // コメントのテキスト数をカウント

  const onClick = () => {
    console.log({ name, feedback, title, comment });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        // to make the demo resizable
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Typography level="title-lg">フィードバック</Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          // display: "grid",
          gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
          gap: 1.5,
        }}
      >
        <FormControl>
          <FormLabel>name</FormLabel>
          <Input
            placeholder="匿名の場合、空白にしてください"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            どのようなフィードバックを提供していただけますか？
          </FormLabel>
          <RadioGroup
            defaultValue="medium"
            name="radio-buttons-group"
            orientation="horizontal"
            onChange={(e) => setFeedback(e.target.value)}
          >
            <Radio value="good" label="高評価" color="primary" />
            <Radio value="hint" label="アドバイス" color="primary" />
            <Radio value="bad" label="低評価" color="primary" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>title</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <Textarea
          size="sm"
          minRows={4}
          sx={{ mt: 1.5, gridColumn: "1/-1" }}
          placeholder="フィードバックを入力してください"
          onChange={(e) => setComment(e.target.value)}
        />
        <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
          {comment.length}/500
        </FormHelperText>
        <CardActions>
          <Button variant="solid" color="primary" onClick={onClick}>
            送信
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
