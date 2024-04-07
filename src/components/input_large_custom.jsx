import React from "react";
import TextField from "@mui/material/TextField";

export default function InputLargeCus({ placeholder, onChange, name, width }) {
  return (
    <TextField
      required
      fullWidth
      name={name}
      label={placeholder}
      multiline
      rows={6}
      variant="outlined"
      onChange={onChange}
      sx={{ maxWidth: width, marginBottom: "30px" }}
    />
  );
}
