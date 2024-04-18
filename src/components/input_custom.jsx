import React from "react";
import TextField from "@mui/material/TextField";

export default function InputCus({
  placeholder,
  onChange,
  width,
  name,
  isPassword,
  marginBottom,
  value,
  isDisabled = false,
}) {
  return (
    <TextField
      multiline
      name={name}
      type={isPassword ? "password" : "text"}
      sx={{ width: width || "400px", marginBottom: marginBottom }}
      label={placeholder}
      color="primary"
      onChange={onChange}
      value={value}
      disabled={isDisabled}
    />
  );
}
