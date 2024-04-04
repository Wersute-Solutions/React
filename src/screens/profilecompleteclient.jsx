import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AppBarCus from "../components/appbar_custom";
import InputCus from "../components/input_custom";
import ButtonCus from "../components/button_custom";

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
        <Typography variant="h4" align="center" gutterBottom>
          Complete Your Profile
        </Typography>
        {alert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {alert}
          </Stack>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginRight: "20px" }}>
            <InputCus
              placeholder={"First Name"}
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              pad={1}
              width={300}
            />
            <InputCus
              placeholder={"Date of Birth (YYYY-MM-DD)"}
              name="dateOfBirth"
              onChange={handleChange}
              value={formData.dateOfBirth}
              pad={1}
              width={300}
            />
            <InputCus
              placeholder={"business profession"}
              name="businessProfession"
              onChange={handleChange}
              value={formData.linkedin}
              pad={1}
              width={300}
            />
          </div>
          <div>
            <InputCus
              placeholder={"Last Name"}
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              pad={1}
              width={300}
            />
            <InputCus
              placeholder={"Contact Number"}
              name="contactNumber"
              onChange={handleChange}
              value={formData.contactNumber}
              pad={1}
              width={300}
            />
            <InputCus
              placeholder={"business name"}
              name="businessName"
              onChange={handleChange}
              value={formData.projectsExperience}
              pad={1}
              width={300}
            />
          </div>
        </div>
        <TextField
          required
          fullWidth
          id="bio"
          name="aboutBusiness"
          label="about buisness"
          multiline
          rows={4}
          variant="outlined"
          value={formData.bio}
          onChange={handleChange}
          sx={{ marginBottom: 2, maxWidth: 600, py: 1 }}
        />

        <ButtonCus
          pad={3}
          text={"Submit"}
          onClick={handleSubmit}
          style={{ width: "400px", marginTop: "20px" }}
        />
      </div>
    </>
  );
}
