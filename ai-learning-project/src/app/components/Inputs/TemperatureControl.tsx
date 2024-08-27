import { Box, Slider, Tooltip, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React from "react";

export interface ITemperatureControlProps {
  value: number;
  onChange: (value: number) => void;
}

export function TemperatureControl({
  value,
  onChange,
}: ITemperatureControlProps) {
  const handleChange = (
    e: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    onChange(value as number);
  };
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" flexDirection="row" gap={1}>
        <Typography gutterBottom>Temperature</Typography>
        <Tooltip title="What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.">
          <HelpOutlineIcon />
        </Tooltip>
      </Box>
      <Slider
        value={value}
        onChange={handleChange}
        step={0.1}
        min={0}
        max={2}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
