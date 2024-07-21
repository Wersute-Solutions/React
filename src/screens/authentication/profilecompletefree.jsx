import React, { useState } from "react";
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
import InputLargeCus from "../../components/input_large_custom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date,
    });
  };

  const validateUrl = (url) => {
    const pattern = new RegExp(
      "^(https:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(url) && url.startsWith("https://");
  };

  const handleSubmit = async () => {
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

    if (!formData.dob) {
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

    if (formData.github && !validateUrl(formData.github)) {
      setAlert(
        <Alert severity="error">
          Please enter a valid GitHub URL starting with https://
        </Alert>
      );
      return;
    }

    if (formData.linkedin && !validateUrl(formData.linkedin)) {
      setAlert(
        <Alert severity="error">
          Please enter a valid LinkedIn URL starting with https://
        </Alert>
      );
      return;
    }

    if (!resumeFile) {
      setAlert(<Alert severity="error">Please upload your resume.</Alert>);
      return;
    }

    const allowedFormats = ["application/pdf"];
    if (!allowedFormats.includes(resumeFile.type)) {
      setAlert(
        <Alert severity="error">Please upload your resume in PDF format.</Alert>
      );
      setResumeUploaded(!!resumeFile);

      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataToSend.append(
          key,
          key === "dob" ? value.format("YYYY-MM-DD") : String(value)
        );
      }
      formDataToSend.append("role", "freelancer");
      formDataToSend.append("resume", resumeFile, "resume.pdf");

      const response = await updateProfile(formDataToSend);
      setLoading(false);
      navigate("/");
      window.location.reload()
    } catch (error) {
      setAlert(<Alert severity="error">Failed to submit the form.</Alert>);
    }
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
      <AppBarCus isclickable={false} iswallet={false}/>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
        <div style={{ maxWidth: "700px", width: "100%" }}>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dob"
                  label="Date Of Birth"
                  onChange={handleDateChange}
                  sx={{ width: "300px" }}
                />
              </LocalizationProvider>
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
                placeholder={"GitHub (Optional)"}
                name="github"
                onChange={handleChange}
                value={formData.github}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"LinkedIn (Optional)"}
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
              <InputLargeCus
                name={"bio"}
                onChange={handleChange}
                placeholder={"Bio"}
                value={formData.bio}
                width={710}
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
