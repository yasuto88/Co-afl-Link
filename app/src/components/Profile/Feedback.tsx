import { FeedbackMessage, User } from "@/interface/types";
import { Lightbulb, PriorityHigh, ThumbUpAlt } from "@mui/icons-material";
import {
  Box,
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
  stepClasses,
  useTheme,
} from "@mui/joy";
import { set } from "firebase/database";
import React, { useEffect } from "react";
import FeedbackForm from "./FeedbackForm";

interface Props {
  user: User;
}

const Feedback: React.FC<Props> = (props) => {
  // const [feedbacks, setFeedbacks] = React.useState<FeedbackMessage[]>([]);
  // useEffect(() => {
  //   try {
  //     fetch("/FeedbackMessage.json")
  //       .then((response) => response.json())
  //       .then((data: FeedbackMessage[]) => {
  //         // props.user.feedback_message_ids が存在するか確認し、
  //         // 存在しない場合は空の配列を使用する
  //         const feedbackIds = props.user.feedback_message_ids || [];
  //         const feedbackMessages = data.filter((feedback) => {
  //           return feedbackIds.includes(feedback.id);
  //         });
  //         // 状態にフィードバックメッセージをセットする
  //         setFeedbacks(feedbackMessages);
  //         console.log(feedbackMessages);
  //       });
  //   } catch (error) {
  //     console.error("Feedback fetching error:", error);
  //   }
  // }, [props.user.feedback_message_ids]);
  const theme = useTheme();

  // export interface FeedbackMessage {
  //   id: string;
  //   name?: string;
  //   title: string;
  //   type: "good" | "hint" | "bad";
  //   message: string;
  //   timestamp: string;
  // }

  const feedbacks: FeedbackMessage[] = [
    {
      id: "1",
      name: "山田太郎",
      title: "この部分のデザインが素晴らしいです",
      type: "good",
      message:
        "ユーザーインターフェースは直感的で、非常に使いやすく設計されています。ナビゲーションの流れもスムーズで、ユーザーエクスペリエンスが非常に向上しています。このデザインは視覚的にも魅力的で、素晴らしいワークです。",
      timestamp: "2021-10-01T12:00:00",
    },
    {
      id: "2",
      name: "田中花子",
      title: "この部分のデザインが素晴らしいです",
      type: "hint",
      message:
        "カラースキームは非常によく考えられており、視覚的に魅力的です。詳細にわたる注意が払われているのが分かります。ただし、いくつかのユーザーには色の選択が強すぎると感じられる可能性もあります。",
      timestamp: "2021-10-01T12:00:00",
    },
    {
      id: "3",
      name: "佐藤次郎",
      title: "この部分のデザインが素晴らしいです",
      type: "bad",
      message:
        "フォントの選択と配置が全体の調和を欠いており、デザインの一貫性が乱れています。全体の印象を損なわずに、より調和のとれたデザインに改善することが必要です。特にユーザビリティを考慮する必要があります。",
      timestamp: "2021-10-01T12:00:00",
    },
  ];

  return (
    <>
      <FeedbackForm />
      <Sheet
        color="neutral"
        variant="soft"
        sx={{
          borderRadius: 4,
          padding: 4,
          minHeight: "max-content",
        }}
      >
        <Stepper orientation="vertical" size="lg">
          {feedbacks.length === 0 && (
            <Step indicator={<StepIndicator></StepIndicator>} sx={{ mb: 2 }}>
              <Typography level="title-md">
                フィードバックはまだありません
              </Typography>
              <Typography level="body-sm">
                チームメンバー・審査員からのフィードバックをお待ちください
              </Typography>
            </Step>
          )}
          {feedbacks.map((feedback, index) => (
            // <Step
            //   key={index}
            //   sx={{ mb: 2 }}
            //   indicator={
            //     <StepIndicator
            //       variant="soft"
            //       color={
            //         feedback.type === "good"
            //           ? "primary"
            //           : feedback.type === "hint"
            //           ? "success"
            //           : "danger"
            //       }
            //       sx={{ padding: 2 }}
            //     >
            //       {feedback.type === "good" ? (
            //         <ThumbUpAlt fontSize="medium" />
            //       ) : feedback.type === "hint" ? (
            //         <Lightbulb fontSize="medium" />
            //       ) : (
            //         <PriorityHigh fontSize="medium" />
            //       )}
            //       {/* <ThumbUpAlt fontSize="medium" /> */}
            //     </StepIndicator>
            //   }
            // >
            //   <Typography level="title-md">{feedback.name}</Typography>
            //   <Card
            //     sx={{
            //       padding: 2,
            //       borderRadius: 4,
            //       mb: 2,
            //       // backgroundColor:
            //       //   feedback.feedback === "good"
            //       //     ? theme.vars.palette.primary[50]
            //       //     : feedback.feedback === "hint"
            //       //     ? theme.vars.palette.success[50]
            //       //     : theme.vars.palette.danger[50],
            //     }}
            //     variant="outlined"
            //     color={
            //       feedback.type === "good"
            //         ? "primary"
            //         : feedback.type === "hint"
            //         ? "success"
            //         : "danger"
            //     }
            //   >
            //     <Typography
            //       level="title-lg"
            //       // color={
            //       //   feedback.feedback === "good"
            //       //     ? "primary"
            //       //     : feedback.feedback === "hint"
            //       //     ? "success"
            //       //     : "danger"
            //       // }
            //       // variant="soft"
            //     >
            //       {feedback.title}
            //     </Typography>
            //     <Divider inset="none" />
            //     <Typography
            //       level="body-sm"
            //       // color={
            //       //   feedback.feedback === "good"
            //       //     ? "primary"
            //       //     : feedback.feedback === "hint"
            //       //     ? "success"
            //       //     : "danger"
            //       // }
            //       // variant="soft"
            //     >
            //       {feedback.message}
            //     </Typography>
            //   </Card>
            // </Step>
            <Step
              key={index}
              indicator={
                <StepIndicator
                  variant="solid"
                  sx={{
                    padding: 2,
                    bgcolor:
                      feedback.type === "good"
                        ? theme.vars.palette.primary[400]
                        : feedback.type === "hint"
                        ? theme.vars.palette.success[400]
                        : theme.vars.palette.danger[400],
                  }}
                >
                  {feedback.type === "good" ? (
                    <ThumbUpAlt fontSize="medium" />
                  ) : feedback.type === "hint" ? (
                    <Lightbulb fontSize="medium" />
                  ) : (
                    <PriorityHigh fontSize="medium" />
                  )}
                </StepIndicator>
              }
              sx={{
                mb: 2,
                "--Step-connectorThickness": "1.5px",
                [`& .${stepClasses.completed}`]: {
                  "&::after": { bgcolor: "success.solidBg" },
                },
              }}
            >
              <Typography level="title-sm" sx={{ ml: 1 }}>
                {feedback.name}
              </Typography>
              <Box>
                <Typography level="body-md" sx={{ mb: 1 }}>
                  {feedback.title}
                </Typography>
                <Typography level="body-sm" sx={{ mb: 1 }}>
                  {feedback.message}
                </Typography>
              </Box>
            </Step>
          ))}
          <Step indicator={<StepIndicator></StepIndicator>}></Step>
        </Stepper>
      </Sheet>
    </>
  );
};

export default Feedback;
