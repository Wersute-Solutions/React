import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AppBarCus from "../../components/appbar_custom";
import InputCus from "../../components/input_custom";
import ButtonCus from "../../components/button_custom";
import Grid from "@mui/material/Grid";
import InputLargeCus from "../../components/input_large_custom";
import { updateProfile } from "../../api/profileHelpers";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const popularDomains = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Hospitality",
  "Real Estate",
  "Transportation",
  "Media",
  "Entertainment",
  "Agriculture",
  "Energy",
  "Construction",
  "Legal",
  "Consulting",
  "Marketing",
  "Telecommunications",
  "Pharmaceuticals",
];

export default function ClientProfileComplete() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: null,
    contact_no: "",
    business_name: "",
    business_profession: "",
    about_business: "",
  });
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

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

    if (!formData.about_business.trim()) {
      setAlert(
        <Alert severity="error">Please enter about your business.</Alert>
      );
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

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataToSend.append(key, key === 'dob' ? value.format('YYYY-MM-DD') : String(value));
      }
      formDataToSend.append("role", "client");

      await updateProfile(formDataToSend);

      setTimeout(() => {
        setLoading(false)
        navigate("/");
      }, 2000);

    } catch (error) {
      setAlert(<Alert severity="error">Failed to submit the form.</Alert>);
    } 
  };

  return (
    <>
      <AppBarCus isclickable={false} />
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
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
                name="first_name"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Last Name"}
                name="last_name"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Business Name"}
                name="business_name"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                value={formData.business_profession}
                onChange={(e) => setFormData({ ...formData, business_profession: e.target.value })}
                displayEmpty
                sx={{ width: "300px" }}
              >
                <MenuItem value="" disabled>
                  Business Profession
                </MenuItem>
                {popularDomains.map((domain, index) => (
                  <MenuItem key={index} value={domain}>
                    {domain}
                  </MenuItem>
                ))}
                <MenuItem value="__custom__">Other (Please specify)</MenuItem>
              </Select>
              {formData.business_profession === "__custom__" && (
                <InputCus

                  placeholder={"Enter your profession"}
                  name="custom_business_profession"
                  onChange={handleChange}
                  width={300}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="dob"
                  label="Date Of Birth"
                  value={formData.dob}
                  onChange={handleDateChange}
                  sx={{ width: '300px' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputCus
                placeholder={"Contact Number"}
                name="contact_no"
                onChange={handleChange}
                width={300}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLargeCus
                name={"about_business"}
                onChange={handleChange}
                placeholder={"About Your Business"}
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
