import { Slider, Typography } from "@mui/material";
import * as React from "react";

export interface ITemperatureControlProps {
  value: number;
  onChange: (value: number) => void;
}

export function TemperatureControl({
  value,
  onChange,
}: ITemperatureControlProps) {
  return (
    <>
      <Typography gutterBottom>Temperature</Typography>
      <Slider
        value={value}
        onChange={(e, newValue) => onChange(newValue as number)}
        step={0.1}
        min={0}
        max={2}
        valueLabelDisplay="auto"
      />
    </>
  );
}
