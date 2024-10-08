"use client";
import { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import chatService from "../apis/chatgpt";
import { SystemPromptInput } from "./Inputs/SystemPromptInput";
import { UserPromptInput } from "./Inputs/UserPromptInput";
import { TemperatureControl } from "./Inputs/TemperatureControl";
import ImageUploadInput from "./Inputs/ImageUploadInput";
import Image from "next/image";
import { TopPControl } from "./Inputs/TopPControl";

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

export const ChatForm = ({ page }: Props): JSX.Element => {
  const [systemPrompt, setSystemPrompt] = useState<string>(
    `Act as if you were ${page.name}`
  );
  const [userPrompt, setUserPrompt] = useState<string>(page.question);
  const [temperature, setTemperature] = useState<number>(1);
  const [topP, setTopP] = useState<number>(1);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
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
    const response = await chatService.getChatCompletion({
      systemPrompt,
      userPrompt,
      temperature,
      topP,
      base64Image: image,
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
        <Box display="flex" flexDirection="row" gap={1}>
          <TemperatureControl value={temperature} onChange={setTemperature} />
          <TopPControl value={topP} onChange={setTopP} />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {page.showImageControl && (
            <ImageUploadInput
              onImageUpload={(base64String) => {
                setImage(base64String);
              }}
            />
          )}
          {image && (
            <Image
              src={image.toString()}
              alt="Uploaded"
              width={300}
              height={300}
            />
          )}
        </Box>
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
