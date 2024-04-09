import React, { useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import Grid from "@mui/material/Grid";
import InputCus from "../../components/input_custom";
import InputLargeCus from "../../components/input_large_custom";
import ButtonCus from "../../components/button_custom";
import DrawerCus from "../../components/drawer_custom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"; // Import the image picker icon
import BoxCus from "../../components/box_custom";

export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    approx_pay: "",
    skills_required: "",
    duration: "",
    responsibilities: "",
  });

  const [showMoreFields, setShowMoreFields] = useState(false);

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

  const toggleShowMoreFields = () => {
    setShowMoreFields((prevShowMoreFields) => !prevShowMoreFields);
  };

  return (
    <>
      <AppBarCus
        showMenuIcon
        showSearchBar
        showNotificationButton
        onMenuIconClick={toggleMenu}
      />
      <DrawerCus open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
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
        <Typography
          variant="h4"
          gutterBottom
          marginTop={"20px"}
          marginBottom={"40px"}
        >
          Create a Post
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <BoxCus
              element={
                <IconButton>
                  <PhotoCameraIcon fontSize="large" />
                </IconButton>
              }
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputCus
                  name={"title"}
                  onChange={handleChange}
                  placeholder={"Title"}
                  marginbottom={5}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputLargeCus
                  name={"description"}
                  onChange={handleChange}
                  placeholder={"Description"}
                />
              </Grid>
              {showMoreFields && (
                <>
                  <Grid item xs={6}>
                    <InputCus
                      name={"approx_pay"}
                      placeholder={"Approximate Pay"}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputCus
                      name={"skills_required"}
                      placeholder={"Skills Required"}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputCus
                      name={"duration"}
                      placeholder={"Duration"}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputCus
                      name={"responsibilities"}
                      placeholder={"Responsibilities"}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <IconButton
                  onClick={toggleShowMoreFields}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "auto",
                  }}
                >
                  {showMoreFields ? (
                    <ExpandLessIcon fontSize="large" />
                  ) : (
                    <ExpandMoreIcon fontSize="large" />
                  )}
                  <Typography>
                    {showMoreFields ? "Show Less Fields" : "Show More Fields"}
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item xs={6} marginTop={"50px"}>
                <ButtonCus text={"Post"} onClick={() => {}} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
