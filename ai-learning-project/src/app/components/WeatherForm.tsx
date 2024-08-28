"use client";
import { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import chatService from "../apis/chatgpt";
import { SystemPromptInput } from "./Inputs/SystemPromptInput";
import { UserPromptInput } from "./Inputs/UserPromptInput";

type ChatResponse = {
  loading: boolean;
  hasErrors: boolean;
  message: string;
};

interface Props {
  page: {
    name: string;
    title: string;
    question: string;
    showImageControl: boolean;
  };
}

export const WeatherForm = ({ page }: Props): JSX.Element => {
  const [systemPrompt, setSystemPrompt] = useState<string>(
    `Act as if you were ${page.name}`
  );
  const [userPrompt, setUserPrompt] = useState<string>(page.question);
  const [chatResponse, setChatResponse] = useState<ChatResponse>({
    loading: false,
    hasErrors: false,
    message: "",
  });

  const handleChat = async () => {
    setChatResponse({
      loading: true,
      hasErrors: false,
      message: "ChatGPT is processing your answer...",
    });
    const response = await chatService.getChatCompletionWithTools({
      systemPrompt,
      userPrompt,
    });
    setChatResponse({
      loading: false,
      hasErrors: response.hasErrors,
      message: response.message,
    });
  };

  return (
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        {page.title}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        component="form"
        noValidate
        autoComplete="off"
      >
        <SystemPromptInput value={systemPrompt} onChange={setSystemPrompt} />
        <UserPromptInput value={userPrompt} onChange={setUserPrompt} />
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
