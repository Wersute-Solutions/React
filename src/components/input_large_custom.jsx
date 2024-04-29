import React from "react";
import TextField from "@mui/material/TextField";

export default function InputLargeCus({
  placeholder,
  onChange,
  name,
  width,
  isDisabled = false,
  value,
}) {
  return (
    <TextField
      value={value}
      fullWidth
      name={name}
      label={placeholder}
      multiline
      rows={6}
      variant="outlined"
      onChange={onChange}
      sx={{
        maxWidth: width,
        marginBottom: "30px",
        pointerEvents: isDisabled ? "none" : "auto",
      }}
      disabled={isDisabled}
    />
  );
}
