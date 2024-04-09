import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AppBarCus from "../../components/appbar_custom";
import InputCus from "../../components/input_custom";
import ButtonCus from "../../components/button_custom";
import Grid from "@mui/material/Grid";
import InputLargeCus from "../../components/input_large_custom";

export default function ClientProfileComplete() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactNumber: "",
    businessName: "",
    businessProfession: "",
    aboutBusiness: "",
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setAlert(null);

    if (!formData.firstName.trim()) {
      setAlert(<Alert severity="error">Please enter your first name.</Alert>);
      return;
    }

    if (!formData.lastName.trim()) {
      setAlert(<Alert severity="error">Please enter your last name.</Alert>);
      return;
    }

    if (!formData.aboutBusiness.trim()) {
      setAlert(
        <Alert severity="error">Please enter about your buisness.</Alert>
      );
      return;
    }

    if (!formData.dateOfBirth.trim()) {
      setAlert(
        <Alert severity="error">Please enter your date of birth.</Alert>
      );
      return;
    }

    const contactNumberPattern = /^\d{10}$/;
    if (!contactNumberPattern.test(formData.contactNumber)) {
      setAlert(
        <Alert severity="error">Please enter a valid contact number.</Alert>
      );
      return;
    }

    if (!formData.businessProfession.trim()) {
      setAlert(
        <Alert severity="error">Please enter your business profession.</Alert>
      );
      return;
    }

    if (!formData.businessName.trim()) {
      setAlert(
        <Alert severity="error">Please enter your business name.</Alert>
      );
      return;
    }

    console.log("Form submitted:", formData);
  };

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
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            marginTop={"40px"}
          >
            Complete Your Profile
          </Typography>
          {alert && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              {alert}
            </Stack>
          )}
          <Grid container spacing={2} marginTop={"40px"}>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"First Name"}
                name="firstName"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Date of Birth (YYYY-MM-DD)"}
                name="dateOfBirth"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"business profession"}
                name="businessProfession"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Last Name"}
                name="lastName"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Contact Number"}
                name="contactNumber"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"business name"}
                name="businessName"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLargeCus
                name={"aboutBusiness"}
                onChange={handleChange}
                placeholder={"about buisness"}
                width={710}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ButtonCus text={"Submit"} onClick={handleSubmit} />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
