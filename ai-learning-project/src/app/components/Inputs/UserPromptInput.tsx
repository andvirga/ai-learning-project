import { TextField } from "@mui/material";

export interface IUserPromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserPromptInput({ value, onChange }: IUserPromptInputProps) {
  return (
    <TextField
      label="User Prompt"
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
