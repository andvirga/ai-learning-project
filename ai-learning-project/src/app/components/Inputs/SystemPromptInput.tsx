import { TextField } from "@mui/material";

export interface ISystemPromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SystemPromptInput({
  value,
  onChange,
}: ISystemPromptInputProps) {
  return (
    <TextField
      label="System Prompt"
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
