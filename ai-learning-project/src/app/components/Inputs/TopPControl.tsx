import { Box, Slider, Tooltip, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import * as React from "react";

export interface ITopPControlProps {
  value: number;
  onChange: (value: number) => void;
}

export function TopPControl({ value, onChange }: ITopPControlProps) {
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
        <Typography gutterBottom>Top P</Typography>
        <Tooltip
          title="Top P is nucleus sampling, where the model considers the results of
          the tokens with top_p probability mass. So 0.1 means only the tokens
          comprising the top 10% probability mass are considered."
        >
          <HelpOutlineIcon />
        </Tooltip>
      </Box>
      <Slider
        value={value}
        onChange={handleChange}
        step={0.01}
        min={0}
        max={1}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
