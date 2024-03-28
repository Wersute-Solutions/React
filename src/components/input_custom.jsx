import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function InputCus({
  placeholder,
  onChange,
  pad,
  width,
  name,
  isPassword,
}) {
  return (
    <Grid container justifyContent="center" sx={{ py: pad }}>
      <Grid item>
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
      </Grid>
    </Grid>
  );
}
