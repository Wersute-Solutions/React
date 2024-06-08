import React from "react";
import TextField from "@mui/material/TextField";

export default function InputCus({
  placeholder,
  onChange,
  width,
  name,
  isPassword = false,
  marginBottom,
  value,
  isDisabled = false,
}) {
  return (
    <TextField
      name={name}
      type={isPassword ? "password" : "text"}
      sx={{ width: width || "400px", marginBottom: marginBottom }}
      label={placeholder}
      color="primary"
      onChange={onChange}
      value={value}
      disabled={isDisabled}
      multiline={!isPassword}
    />
  );
}
