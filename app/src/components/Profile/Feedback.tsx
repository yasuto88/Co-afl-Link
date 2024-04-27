import { FeedbackMessage, User } from "@/interface/types";
import { Lightbulb, PriorityHigh, ThumbUpAlt } from "@mui/icons-material";
import {
  Box,
  Sheet,
  Step,
  StepIndicator,
  Stepper,
  Typography,
  stepClasses,
  useTheme,
} from "@mui/joy";
import React, { useEffect } from "react";
import FeedbackForm from "./FeedbackForm";
// import FeedbackForm from "./FeedbackForm";

interface Props {
  user: User;
}

const Feedback: React.FC<Props> = (props) => {
  const [feedbacks, setFeedbacks] = React.useState<FeedbackMessage[]>([]);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`/api/feedback/${props.user.id}`);
        if (!res.ok)
          throw new Error(
            `Failed to fetch feedbacks with status: ${res.status}`
          );
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Feedback fetching error:", error);
      }
    };

    if (props.user && props.user.id) {
      fetchFeedbacks();
    }
  }, [props.user.id]);
  const theme = useTheme();

  return (
    <>
      <FeedbackForm userId={props.user.id} />
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
