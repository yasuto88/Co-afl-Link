import {
  Lightbulb,
  PriorityHigh,
  ThumbUpAlt,
} from "@mui/icons-material";
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
  Sheet,
  Step,
  StepIndicator,
  Stepper,
  Textarea,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";

const feedbacks = [
  {
    name: "山田太郎",
    title: "素晴らしい発表でした！",
    content:
      "とてもわかりやすく、内容も充実していました！具体的には、新しいインターフェースの操作方法、新たに追加されたツールの使用方法、そしてそれらがどのように作業の効率を向上させるかについて説明しました。",
    feedback: "good",
  },
  {
    name: "山田太郎",
    title: "もう少し具体的な説明があるとよかったと思います",
    content:
      "発表自体はとてもわかりやすかったのですが、もう少し具体的な説明があるとよかったと思います。",
    feedback: "hint",
  },
  {
    name: "山田太郎",
    title: "発表の内容がわかりませんでした",
    content:
      "発表の内容がわかりませんでした。もう少しわかりやすく説明してほしいです。",
    feedback: "bad",
  },
];

interface Props {
  // props here
}

const Feedback: React.FC<Props> = (props) => {
  const theme = useTheme();
  return (
    <>
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
            <Input placeholder="匿名の場合、空白にしてください" />
          </FormControl>
          <FormControl>
            <FormLabel>
              どのようなフィードバックを提供していただけますか？
            </FormLabel>
            <RadioGroup
              defaultValue="medium"
              name="radio-buttons-group"
              orientation="horizontal"
            >
              <Radio value="primary" label="高評価" color="primary" />
              <Radio value="neutral" label="アドバイス" color="primary" />
              <Radio value="danger" label="低評価" color="primary" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>title</FormLabel>
            <Input />
          </FormControl>
          <Textarea
            size="sm"
            minRows={4}
            sx={{ mt: 1.5, gridColumn: "1/-1" }}
            placeholder="フィードバックを入力してください"
          />
          <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
            0/500
          </FormHelperText>
          <CardActions>
            <Button variant="solid" color="primary">
              送信
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <Sheet
        color="neutral"
        variant="soft"
        sx={{
          borderRadius: 4,
          padding: 4,
        }}
      >
        <Stepper orientation="vertical" size="lg">
          {feedbacks.map((feedback, index) => (
            <Step
              key={index}
              sx={{ mb: 2 }}
              
              indicator={
                <StepIndicator
                  variant="soft"
                  color={
                    feedback.feedback === "good"
                      ? "primary"
                      : feedback.feedback === "hint"
                      ? "success"
                      : "danger"
                  }
                  
                  sx={{ padding: 2 }}
                >
                  {feedback.feedback === "good" ? (
                    <ThumbUpAlt fontSize="medium" />
                  ) : feedback.feedback === "hint" ? (
                    <Lightbulb fontSize="medium" />
                  ) : (
                    <PriorityHigh fontSize="medium" />
                  )}
                  {/* <ThumbUpAlt fontSize="medium" /> */}
                </StepIndicator>
              }
            >
              <Typography
                level="title-md"
              >
                {feedback.name}
              </Typography>
              <Card
                sx={{
                  padding: 2,
                  borderRadius: 4,
                  mb: 2,
                  // backgroundColor:
                  //   feedback.feedback === "good"
                  //     ? theme.vars.palette.primary[50]
                  //     : feedback.feedback === "hint"
                  //     ? theme.vars.palette.success[50]
                  //     : theme.vars.palette.danger[50],
                }}
                variant="outlined"
                color={
                  feedback.feedback === "good"
                    ? "primary"
                    : feedback.feedback === "hint"
                    ? "success"
                    : "danger"
                }
                
              >
                <Typography
                  level="title-lg"
                  // color={
                  //   feedback.feedback === "good"
                  //     ? "primary"
                  //     : feedback.feedback === "hint"
                  //     ? "success"
                  //     : "danger"
                  // }
                  // variant="soft"
                >
                  {feedback.title}
                </Typography>
                <Divider inset="none" />
                <Typography
                  level="body-sm"
                  // color={
                  //   feedback.feedback === "good"
                  //     ? "primary"
                  //     : feedback.feedback === "hint"
                  //     ? "success"
                  //     : "danger"
                  // }
                  // variant="soft"
                >
                  {feedback.content}
                </Typography>
              </Card>
            </Step>
          ))}
          <Step indicator={<StepIndicator></StepIndicator>}></Step>
        </Stepper>
      </Sheet>
    </>
  );
};

export default Feedback;