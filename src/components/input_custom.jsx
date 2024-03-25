import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function InputCus({ placeholder, onChange, pad, width, name }) {
  return (
    <Grid container justifyContent="center" sx={{ py: pad }}>
      <Grid item>
        <TextField
          required
          multiline
          name={name}
          sx={{ width: width || "400px" }}
          label={placeholder}
          variant="outlined"
          color="primary"
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
}
