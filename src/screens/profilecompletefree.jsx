import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AppBarCus from "../components/appbar_custom";
import Typography from "@mui/material/Typography";
import InputCus from "../components/input_custom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ButtonCus from "../components/button_custom";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import DatePicker from "@mui/lab/DatePicker";

export default function FreeProfileComplete() {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <AppBarCus />
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Complete Your Profile
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <InputCus placeholder={"First Name"} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputCus placeholder={"Last Name"} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar
                label="Date of Birth"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputCus placeholder={"Contact Number"} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputCus placeholder={"Skills"} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputCus placeholder={"Projects and Experience"} />
          </Grid>
          <Grid item xs={12}>
            <InputCus placeholder={"GitHub"} />
          </Grid>
          <Grid item xs={12}>
            <InputCus placeholder={"Linkedin"} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="bio"
              label="Bio"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload Resume
              <VisuallyHiddenInput type="file" />
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <ButtonCus text={"Submit"} onClick={() => {}} fullWidth />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
