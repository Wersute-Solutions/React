import React, { useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import DrawerCus from "../../components/drawer_custom";
import ProfilePicture from "../../components/profilepic";
import { Button, Grid } from "@mui/material";
import InputCus from "../../components/input_custom";
import InputLargeCus from "../../components/input_large_custom";
import { styled } from "@mui/material/styles";
import { updateProfile } from "../../api/profileHelpers";

export default function ProfilePageClient({ isSelf = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    contact_number: "",
    business_name: "",
    business_profession: "",
    about_business: "",
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

      if (!formData.about_business.trim()) {
        setAlert(
          <Alert severity="error">Please enter about your buisness.</Alert>
        );
        return;
      }

      if (!formData.dob.trim()) {
        setAlert(
          <Alert severity="error">Please enter your date of birth.</Alert>
        );
        return;
      }

      const contactNumberPattern = /^\d{10}$/;
      if (!contactNumberPattern.test(formData.contact_number)) {
        setAlert(
          <Alert severity="error">Please enter a valid contact number.</Alert>
        );
        return;
      }

      if (!formData.business_profession.trim()) {
        setAlert(
          <Alert severity="error">Please enter your business profession.</Alert>
        );
        return;
      }

      if (!formData.business_name.trim()) {
        setAlert(
          <Alert severity="error">Please enter your business name.</Alert>
        );
        return;
      }
      setFormData({
        ...formData,
        role: "client",
      });

      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataToSend.append(key, String(value));
      }
      formDataToSend.append("role", "client");

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
                placeholder={"Buisness Name"}
                name="buisness_name"
                onChange={handleChange}
                value={formData.skills}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Buisness Profession"}
                name="business_profession"
                onChange={handleChange}
                value={formData.github}
                width={300}
                isDisabled={!isEditMode}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLargeCus
                name={"about_business"}
                onChange={handleChange}
                placeholder={"About Buisness"}
                width={710}
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
