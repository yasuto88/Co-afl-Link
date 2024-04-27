import postFeedback from "@/features/api/postFeedback";
import { FeedbackMessage } from "@/interface/types";
import { CheckCircle, Close, Info } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Snackbar,
  Textarea,
  Typography,
} from "@mui/joy";
import React from "react";

interface Props {
  userId: string;
}

const FeedbackForm: React.FC<Props> = (props) => {
  const [name, setName] = React.useState("");
  const [feedback, setFeedback] = React.useState("good");
  const [title, setTitle] = React.useState("");
  const [comment, setComment] = React.useState("");
  // loading中のフラグ
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  // フォームが空の際のエラーフラグ
  const [error, setError] = React.useState(false);

  // コメントのテキスト数をカウント

  const onClick = async () => {
    setLoading(true);
    setSuccess(false);
    setError(false);

    if (title == "" || comment == "") {
      setError(true);
      setLoading(false);
      return;
    }

    const feedbackMessage: FeedbackMessage = {
      id: "",
      userId: props.userId,
      name: name == "" ? "匿名" : name,
      title: title,
      type: feedback as "good" | "hint" | "bad",
      message: comment,
      timestamp: new Date().toISOString(),
    };
    try {
      const response = await postFeedback(feedbackMessage);
      setLoading(false);
      setSuccess(true);
      console.log("Feedback response:", response);
      // 送信後の処理（例: フォームをクリアする等）
    } catch (error) {
      console.error("Failed to send feedback:", error);
    }
  };

  return (
    <>
      <Snackbar
        autoHideDuration={2000}
        color="primary"
        variant="outlined"
        open={success} // 成功時のみスナックバーを表示
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        startDecorator={<CheckCircle />}
        endDecorator={
          <IconButton onClick={() => setSuccess(false)}>
            <Close />
          </IconButton>
        }
      >
        投稿が完了しました！
      </Snackbar>
      <Snackbar
        open={error}
        color="danger"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        variant="outlined"
        startDecorator={<Info />}
        endDecorator={
          <IconButton onClick={() => setError(false)}>
            <Close />
          </IconButton>
        }
      >
        タイトルとコメントは必須です
      </Snackbar>
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
          <form>
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
                value={feedback}
              >
                <Radio value="good" label="高評価" color="primary" />
                <Radio value="hint" label="アドバイス" color="primary" />
                <Radio value="bad" label="低評価" color="primary" />
              </RadioGroup>
            </FormControl>
            <FormControl required>
              <FormLabel>title</FormLabel>
              <Input onChange={(e) => setTitle(e.target.value)} required />
            </FormControl>
            <FormControl required>
              <Textarea
                size="sm"
                minRows={4}
                sx={{ mt: 1.5, gridColumn: "1/-1" }}
                placeholder="フィードバックを入力してください"
                onChange={(e) => {
                  setComment(e.target.value);
                  if (e.target.value.length > 500) {
                    // 500文字以上の場合はこれ以上入力できないようにする
                    setComment(e.target.value.slice(0, 500));
                  }
                }}
                required
              />
              <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
                {comment.length}/500
              </FormHelperText>
            </FormControl>
          </form>
          <CardActions>
            <Button
              variant="solid"
              color="primary"
              onClick={onClick}
              loading={loading && success}
            >
              送信
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default FeedbackForm;
