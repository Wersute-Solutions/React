import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import AppBarCus from "../../components/appbar_custom";
import InputCus from "../../components/input_custom";
import ButtonCus from "../../components/button_custom";
import { updateProfile } from "../../api/profileHelpers";

export default function FreeProfileComplete() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    contact_no: "",
    skills: "",
    projects_and_experience: "",
    github: "",
    linkedin: "",
    bio: "",
  });

  const [alert, setAlert] = useState(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const resumeFile = e.target.files[0];
    if (resumeFile) {
      setResumeFile(resumeFile);
      setResumeUploaded(true);
      console.log(formData);
    }
  };

  const handleSubmit = () => {
    setAlert(null);

    if (!formData.first_name.trim()) {
      setAlert(<Alert severity="error">Please enter your first name.</Alert>);
      return;
    }

    if (!formData.last_name.trim()) {
      setAlert(<Alert severity="error">Please enter your last name.</Alert>);
      return;
    }

    if (!formData.bio.trim()) {
      setAlert(<Alert severity="error">Please enter your bio.</Alert>);
      return;
    }

    if (!formData.linkedin.trim()) {
      setAlert(<Alert severity="error">Please enter your linkedin.</Alert>);
      return;
    }

    if (!formData.dob.trim()) {
      setAlert(
        <Alert severity="error">Please enter your date of birth.</Alert>
      );
      return;
    }

    const contactNumberPattern = /^\d{10}$/;
    if (!contactNumberPattern.test(formData.contact_no)) {
      setAlert(
        <Alert severity="error">Please enter a valid contact number.</Alert>
      );
      return;
    }

    if (!formData.skills.trim()) {
      setAlert(<Alert severity="error">Please enter your skills.</Alert>);
      return;
    }

    if (!formData.projects_and_experience.trim()) {
      setAlert(
        <Alert severity="error">
          Please enter your projects and experience.
        </Alert>
      );
      return;
    }

    if (!formData.github.trim()) {
      setAlert(<Alert severity="error">Please enter your github.</Alert>);
      return;
    }
    if (!resumeFile) {
      setAlert(<Alert severity="error">Please upload your resume.</Alert>);
      return;
    }

    const allowedFormats = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedFormats.includes(resumeFile.type)) {
      setAlert(
        <Alert severity="error">
          Please upload your resume in PNG or JPEG format.
        </Alert>
      );
      setResumeUploaded(!!resumeFile);

      return;
    }

    setFormData({
      ...formData,
      role: "freelancer",
    });

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, String(value));
    }
    formDataToSend.append("role", "freelancer");
    formDataToSend.append("resume", resumeFile, "resume.pdf");

    updateProfile(formDataToSend);
  };

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Complete Your Profile
          </Typography>
          {alert && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              {alert}
            </Stack>
          )}
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"First Name"}
                name="first_name"
                onChange={handleChange}
                value={formData.first_name}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Last Name"}
                name="last_name"
                onChange={handleChange}
                value={formData.last_name}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Date of Birth (YYYY-MM-DD)"}
                name="dob"
                onChange={handleChange}
                value={formData.dob}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Contact Number"}
                name="contact_no"
                onChange={handleChange}
                value={formData.contact_no}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Skills"}
                name="skills"
                onChange={handleChange}
                value={formData.skills}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"GitHub"}
                name="github"
                onChange={handleChange}
                value={formData.github}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"LinkedIn"}
                name="linkedin"
                onChange={handleChange}
                value={formData.linkedin}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Projects and Experience"}
                name="projects_and_experience"
                onChange={handleChange}
                value={formData.projects_and_experience}
                width={300}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="bio"
                name="bio"
                label="Bio"
                multiline
                rows={6}
                variant="outlined"
                value={formData.bio}
                onChange={handleChange}
                style={{ marginBottom: "20px", width: "88.5%" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                {resumeUploaded ? "Resume Uploaded" : "Upload Resume"}
                <VisuallyHiddenInput
                  type="file"
                  id="resume"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ButtonCus pad={3} text={"Submit"} onClick={handleSubmit} />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
