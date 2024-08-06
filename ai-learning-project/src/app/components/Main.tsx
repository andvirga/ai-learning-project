"use client";
import { useState } from "react";
import {
  Container,
  TextField,
  Slider,
  Box,
  Typography,
  Button,
} from "@mui/material";
import chatService from "../apis/chatgpt";

type ChatResponse = {
  loading: boolean;
  message: string;
};

export const Main = (): JSX.Element => {
  const [systemPrompt, setSystemPrompt] = useState<string>("Act as if you were Albert Einstein");
  const [userPrompt, setUserPrompt] = useState<string>("Do you believe god is playing with dices?");
  const [temperature, setTemperature] = useState<number>(0.5);
  const [chatResponse, setChatResponse] = useState<ChatResponse>({
    loading: false,
    message: "",
  });

  const handleChat = async () => {
    setChatResponse({ loading: true, message: "ChatGPT is processing your answer..."})
    const response = await chatService.getChatCompletion({
      systemPrompt,
      userPrompt,
      temperature,
    });
    setChatResponse({
      loading: false,
      message: response.choices[0].message?.content || "",
    });
  };

  return (
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Learning Chat
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="System Prompt"
          variant="outlined"
          fullWidth
          margin="normal"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />
        <TextField
          label="User Prompt"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <Typography gutterBottom>Temperature</Typography>
        <Slider
          value={temperature}
          onChange={(e, newValue) => setTemperature(newValue)}
          step={0.01}
          min={0}
          max={1}
          valueLabelDisplay="auto"
        />
        <Button variant="contained" color="primary" onClick={handleChat}>
          Send
        </Button>
      </Box>
      <Box my={4}>
        <TextField
          label="Chat Response"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          value={chatResponse.message}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </Box>
  );
};
