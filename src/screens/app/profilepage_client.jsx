import React, { useEffect, useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import ProfilePicture from "../../components/profilepic";  
import { Button, Grid, Stack, CircularProgress, Backdrop } from "@mui/material";
import InputCus from "../../components/input_custom";
import InputLargeCus from "../../components/input_large_custom";
import { updateProfile, fetchProfile } from "../../api/profileHelpers";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import DrawerCusClient from "../../components/drawer_custom_client";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import DrawerCus from "../../components/drawer_custom_freelancer";

export default function ProfilePageClient({ isSelf = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alert, setAlert] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [loading, setLoading] = useState(true);  
  const { id } = useParams();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    contact_no: "",
    business_name: "",
    business_profession: "",
    about_business: "",
  });

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetchProfile(id);
        setFormData({
          ...response[0],
          dob: response[0].dob ? dayjs(response[0].dob) : null,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date,
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleEditClick = async () => {
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

      if (!formData.about_business.trim()) {
        setAlert(<Alert severity="error">Please enter information about your business.</Alert>);
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

      setLoading(true);
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (key === "resume" || key === "avatar") continue;
        formDataToSend.append(key, key === 'dob' ? value.format('YYYY-MM-DD') : String(value));
      }
      formDataToSend.append("role", "client");
      if (profilePicFile) {
        formDataToSend.append("avatar", profilePicFile, "avatar.png");
      }

      try {
        await updateProfile(formDataToSend);
        setLoading(false);
        window.location.reload();
      } catch (error) {
        setAlert(<Alert severity="error">Failed to update profile.</Alert>);
        setLoading(false);
      }
    }
    setIsEditMode(!isEditMode);
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
      {isSelf?<DrawerCusClient open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      :<DrawerCus open={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>}
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
          image={formData?.avatar}
          size={200}
          isEdit={isEditMode}
          setPicFile={setProfilePicFile}
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
                placeholder={"Business Profession"}
                name="business_profession"
                onChange={handleChange}
                value={formData.business_profession}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dob"
                  label="Date Of Birth"
                  value={formData.dob}
                  onChange={handleDateChange}
                  sx={{ width: '300px' }}
                  disabled={!isEditMode}
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
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Business Name"}
                name="business_name"
                onChange={handleChange}
                value={formData.business_name}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLargeCus
                name={"about_business"}
                onChange={handleChange}
                placeholder={"About Business"}
                width={710}
                value={formData.about_business}
                isDisabled={!isEditMode}
              />
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
