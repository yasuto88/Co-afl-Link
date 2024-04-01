import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Typography,
} from "@mui/joy";
import React from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";

interface Props {
  // props here
}

const Activity: React.FC<Props> = (props) => {
  const peopleData = [
    {
      name: "山田太郎",
      position: "UI Designer",
      avatar2x: "",
      taskData: [
        {
          time: "2024/4/1 12:15",
          description: "デザインの修正",
        },
        {
          time: "2024/4/1 19:00",
          description: "デザインの作成",
        },
        {
          time: "2024/4/2 10:00",
          description: "デザインの修正",
        },
      ],
      skills: ["UI design", "Illustration"],
    },
    {
      name: "田中花子",
      position: "Frontend Developer",
      avatar2x: "",
      taskData: [
        {
          time: "2024/4/1 12:15",
          description: "コンポーネントの修正",
        },
      ],
      skills: ["React", "TypeScript"],
    },
    {
      name: "佐藤次郎",
      position: "Backend Developer",
      avatar2x: "",
      taskData: [
        {
          time: "2024/4/1 12:15",
          description: "APIの修正",
        },
        {
          time: "2024/4/1 19:00",
          description: "APIの作成",
        },
        {
          time: "2024/4/2 10:00",
          description: "APIの修正",
        },
      ],
      skills: ["Node.js", "Express"],
    },
  ];
  return (
    <List
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 2,
      }}
    >
      {peopleData.map((person, index) => (
        <Sheet
          key={index}
          component="li"
          variant="outlined"
          sx={{
            borderRadius: "sm",
            p: 2,
            listStyle: "none",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              variant="outlined"
              src={person.avatar2x}
              srcSet={`${person.avatar2x} 2x`}
              sx={{ borderRadius: "50%" }}
            />
            <div>
              <Typography level="title-md">{person.name}</Typography>
              <Typography level="body-xs">{person.position}</Typography>
            </div>
          </Box>
          <Divider component="div" sx={{ my: 2 }} />
          <Stepper
            sx={{ width: "100%", "--Step-gap": "16px" }}
            orientation="vertical"
          >
            {person.taskData.map((task, taskIndex) => (
              <Step
                key={task.time}
                indicator={
                  <StepIndicator color="primary">
                    <Check />
                  </StepIndicator>
                }
              >
                <Typography level="title-sm">{task.time}</Typography>
                <Typography level="body-xs">{task.description}</Typography>
              </Step>
            ))}
          </Stepper>
          {person.taskData.length > 2 && (
            <Button
              size="sm"
              variant="plain"
              endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
              sx={{ px: 1, mt: 1 }}
            >
              Expand
            </Button>
          )}
          {/* <Button
            size="sm"
            variant="plain"
            endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
            sx={{ px: 1, mt: 1 }}
          >
            Expand
          </Button> */}
        </Sheet>
      ))}
    </List>
  );
};

export default Activity;
