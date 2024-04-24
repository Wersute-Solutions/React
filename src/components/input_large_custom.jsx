import React from "react";
import TextField from "@mui/material/TextField";

export default function InputLargeCus({
  placeholder,
  onChange,
  name,
  width,
  isDisabled = false, // Default value for isDisabled
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
        pointerEvents: isDisabled ? "none" : "auto", // Disable pointer events if isDisabled is true
      }}
      disabled={isDisabled} // Set disabled attribute based on isDisabled prop
    />
  );
}
