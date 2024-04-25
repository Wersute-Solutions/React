import React, { useEffect, useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import DrawerCus from "../../components/drawer_custom";
import ProfilePicture from "../../components/profilepic";
import { Button, Grid } from "@mui/material";
import InputCus from "../../components/input_custom";
import InputLargeCus from "../../components/input_large_custom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { updateProfile } from "../../api/profileHelpers";
import { fetchProfile } from "../../api/profileHelpers";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ProfilePageFreelancer({ isSelf = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alert, setAlert] = useState(null);

  const [resumeFile, setResumeFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function getProfile() {
      const response = await fetchProfile(id);
      setFormData(response[0]);
    }

    getProfile();
  }, []);

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
      console.log(formData);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "assss",
    dob: "",
    contact_no: "",
    skills: "",
    projects_and_experience: "",
    github: "",
    linkedin: "",
    bio: "",
    resume: "",
  });

  const handleEditClick = () => {
    console.log("Edit button clicked");

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

      console.log(formData);

      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataToSend.append(key, String(value));
      }
      formDataToSend.append("role", "freelancer");
      formDataToSend.append("resume", resumeFile, "resume.pdf");

      updateProfile(formDataToSend);
    }
  };

  return (
    <>
      <AppBarCus onMenuIconClick={toggleMenu} showMenuIcon />
      <DrawerCus open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        {alert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {alert}
          </Stack>
        )}
        <ProfilePicture
          image={"profilepicture.png"}
          size={200}
          isEdit={isEditMode}
        />
        <div style={{ maxWidth: "700px", width: "100%" }}>
          <Grid container spacing={2} justifyContent="center" marginTop={5}>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"First Name"}
                name="first_name"
                onChange={handleChange}
                value={formData.first_name}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Last Name"}
                name="last_name"
                onChange={handleChange}
                value={formData.last_name}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Date of Birth (YYYY-MM-DD)"}
                name="dob"
                onChange={handleChange}
                value={formData.dob}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Contact Number"}
                name="contact_no"
                onChange={handleChange}
                value={formData.contact_no}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Skills"}
                name="skills"
                onChange={handleChange}
                value={formData.skills}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"GitHub"}
                name="github"
                onChange={handleChange}
                value={formData.github}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"LinkedIn"}
                name="linkedin"
                onChange={handleChange}
                value={formData.linkedin}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Projects and Experience"}
                name="projects_and_experience"
                onChange={handleChange}
                value={formData.projects_and_experience}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLargeCus
                name={"bio"}
                onChange={handleChange}
                placeholder={"Bio"}
                value={formData.bio}
                width={710}
                isDisabled={!isEditMode}
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
                disabled={!isSelf ? false : !isEditMode}
              >
                {!isSelf
                  ? "Download Resume"
                  : resumeUploaded
                  ? "Resume Uploaded"
                  : "Upload Resume"}{" "}
                <VisuallyHiddenInput
                  type="file"
                  id="resume"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            {isSelf && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color={isEditMode ? "secondary" : "primary"}
                  onClick={handleEditClick}
                >
                  {isEditMode ? "Save" : "Edit"}
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </>
  );
}
