import React from "react";
import TextField from "@mui/material/TextField";

export default function InputCus({
  placeholder,
  onChange,
  width,
  name,
  isPassword,
}) {
  return (
    <TextField
      required
      multiline
      name={name}
      type={isPassword ? "password" : "text"}
      sx={{ width: width || "400px" }}
      label={placeholder}
      color="primary"
      onChange={onChange}
    />
  );
}
