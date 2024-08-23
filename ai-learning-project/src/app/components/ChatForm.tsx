"use client";
import { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import chatService from "../apis/chatgpt";
import { SystemPromptInput } from "./Inputs/SystemPromptInput";
import { UserPromptInput } from "./Inputs/UserPromptInput";
import { TemperatureControl } from "./Inputs/TemperatureControl";
import ImageUploadInput from "./Inputs/ImageUploadInput";
import Image from "next/image";

type ChatResponse = {
  loading: boolean;
  message: string;
};

interface Props {
  character: {
    name: string;
    question: string;
    showImageControl: boolean;
  };
}

export const ChatForm = ({ character }: Props): JSX.Element => {
  const [systemPrompt, setSystemPrompt] = useState<string>(
    `Act as if you were ${character.name}`
  );
  const [userPrompt, setUserPrompt] = useState<string>(character.question);
  const [temperature, setTemperature] = useState<number>(0.5);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [chatResponse, setChatResponse] = useState<ChatResponse>({
    loading: false,
    message: "",
  });

  const handleChat = async () => {
    setChatResponse({
      loading: true,
      message: "ChatGPT is processing your answer...",
    });
    const response = await chatService.getChatCompletion({
      systemPrompt,
      userPrompt,
      temperature,
      base64Image: image,
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
        <SystemPromptInput
          value={systemPrompt}
          onChange={(value) => setSystemPrompt(value)}
        />
        <UserPromptInput
          value={userPrompt}
          onChange={(value) => setUserPrompt(value)}
        />
        <TemperatureControl
          value={temperature}
          onChange={(value) => setTemperature(value)}
        />
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {character.showImageControl && (
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