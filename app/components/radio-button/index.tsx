import { theme } from "@/app/theme";
import {
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioProps,
} from "@mui/material";
import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface PCRadioButotnProps extends Omit<FormControlLabelProps, "control"> {
  radioProps?: RadioProps;
}

const PCRadioButton = ({
  label,
  value,
  radioProps,
  ...props
}: PCRadioButotnProps) => {
  return (
    <FormControlLabel
      {...props}
      value={value}
      control={<Radio {...radioProps} />}
      label={label}
    />
  );
};

export default PCRadioButton;
