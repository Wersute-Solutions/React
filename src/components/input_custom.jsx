import React from "react";
import TextField from "@mui/material/TextField";

export default function InputCus({
  placeholder,
  onChange,
  width,
  name,
  isPassword,
  marginbottom,
}) {
  return (
    <TextField
      required
      multiline
      name={name}
      type={isPassword ? "password" : "text"}
      sx={{ width: width || "400px", marginBottom: marginbottom }}
      label={placeholder}
      color="primary"
      onChange={onChange}
    />
  );
}
