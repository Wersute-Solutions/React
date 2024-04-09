import React, { useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import Grid from "@mui/material/Grid";
import InputCus from "../../components/input_custom";
import InputLargeCus from "../../components/input_large_custom";
import ButtonCus from "../../components/button_custom";
import DrawerCus from "../../components/drawer_custom";

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

  const [alert, setAlert] = useState(null);

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
          marginLeft: isMenuOpen ? "250px" : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputCus
              name={"title"}
              onChange={handleChange}
              placeholder={"Title"}
              marginbottom={10}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLargeCus
              name={"description"}
              width="100%"
              onChange={handleChange}
              placeholder={"Description"}
            />
          </Grid>
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
          <Grid item xs={4}>
            <InputCus
              name={"duration"}
              placeholder={"Duration"}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={8}>
            <InputCus
              name={"responsibilities"}
              placeholder={"Responsibilities"}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonCus text={"Post"} onClick={() => {}} fullWidth />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
