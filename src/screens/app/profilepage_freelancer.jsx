import React, { useEffect, useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import DrawerCusClient from "../../components/drawer_custom_client";  // Updated to match the original code
import ProfilePicture from "../../components/profilepic";  
import { Button, Grid, Stack, CircularProgress, Backdrop, Box, useMediaQuery } from "@mui/material";
import InputCus from "../../components/input_custom";
import InputLargeCus from "../../components/input_large_custom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Download } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { updateProfile, fetchProfile } from "../../api/profileHelpers";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import DrawerCus from "../../components/drawer_custom_freelancer";

export default function ProfilePageFreelancer({ isSelf = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alert, setAlert] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [loading, setLoading] = useState(true); // State to indicate loading

  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetchProfile(id);
        setFormData({
          ...response[0],
          dob: response[0].dob ? dayjs(response[0].dob) : null  // Convert the date to dayjs object
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setAlert(<Alert severity="error">Error fetching profile</Alert>);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [id]);

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
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: null,  // Initialize dob as null
    contact_no: "",
    skills: "",
    projects_and_experience: "",
    github: "",
    linkedin: "",
    bio: "",
    avatar: "",
  });

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
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
        setAlert(<Alert severity="error">Please enter your LinkedIn profile.</Alert>);
        return;
      }

      if (!formData.dob) {
        setAlert(<Alert severity="error">Please enter your date of birth.</Alert>);
        return;
      }

      const contactNumberPattern = /^\d{10}$/;
      if (!contactNumberPattern.test(formData.contact_no)) {
        setAlert(<Alert severity="error">Please enter a valid contact number.</Alert>);
        return;
      }

      if (!formData.projects_and_experience.trim()) {
        setAlert(<Alert severity="error">Please enter your projects and experience.</Alert>);
        return;
      }

      setLoading(true);
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (key === "resume" || key === "avatar") continue;
        formDataToSend.append(key, key === 'dob' ? value.toISOString() : String(value));  // Convert dob to ISO string
      }
      formDataToSend.append("role", "freelancer");
      if (resumeUploaded) {
        formDataToSend.append("resume", resumeFile, "resume.pdf");
      }
      if (profilePicFile) {
        formDataToSend.append("avatar", profilePicFile, "avatar.png");
      }

      updateProfile(formDataToSend);
      setLoading(false);
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  return (
    <>
      <AppBarCus onMenuIconClick={toggleMenu} showMenuIcon />

      { isSelf?<DrawerCus open={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> : <DrawerCusClient open={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>}
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          p: isMobile ? 2 : 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {alert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {alert}
          </Stack>
        )}
        <ProfilePicture
          image={formData?.avatar}
          size={isMobile ? 150 : 200}
          isEdit={isEditMode}
          setPicFile={setProfilePicFile}
        />
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <Grid container spacing={isMobile ? 1 : 2} justifyContent="center" mt={isMobile ? 2 : 5}>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder="First Name"
                name="first_name"
                onChange={handleChange}
                value={formData.first_name}
                width={isMobile ? "100%" : 300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder="Last Name"
                name="last_name"
                onChange={handleChange}
                value={formData.last_name}
                width={isMobile ? "100%" : 300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dob"
                  label="Date Of Birth"
                  value={formData.dob}
                  onChange={(date) => setFormData({ ...formData, dob: date })}
                  sx={{ width: '300px' }}
                  disabled={!isEditMode}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder="Contact Number"
                name="contact_no"
                onChange={handleChange}
                value={formData.contact_no}
                width={isMobile ? "100%" : 300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder="Skills"
                name="skills"
                onChange={handleChange}
                value={formData.skills}
                width={isMobile ? "100%" : 300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder="GitHub"
                name="github"
                onChange={handleChange}
                value={formData.github}
                width={isMobile ? "100%" : 300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder="LinkedIn"
                name="linkedin"
                onChange={handleChange}
                value={formData.linkedin}
                width={isMobile ? "100%" : 300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder="Projects and Experience"
                name="projects_and_experience"
                onChange={handleChange}
                value={formData.projects_and_experience}
                width={isMobile ? "100%" : 300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLargeCus
                name="bio"
                onChange={handleChange}
                placeholder="Bio"
                value={formData.bio}
                width={isMobile ? "100%" : 710}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", flexDirection: isMobile ? "column" : "row", gap: 2 }}
            >
              <Button
                component="label"
                variant="contained"
                startIcon={<Download />}
                onClick={() => {
                  window.open(formData.resume, "_blank");
                }}
              >
                Download Resume
              </Button>
              {isSelf && (
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  disabled={!isEditMode}
                >
                  {resumeUploaded ? "Resume Uploaded" : "Upload Resume"} 
                  <VisuallyHiddenInput
                    type="file"
                    id="resume"
                    onChange={handleFileChange}
                  />
                </Button>
              )}
            </Grid>
            {isSelf && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color={isEditMode ? "secondary" : "primary"}
                  onClick={handleEditClick}
                  fullWidth={isMobile}
                >
                  {isEditMode ? "Save" : "Edit"}
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
