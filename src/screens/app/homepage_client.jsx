import React, { useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import ProfilePicture from "../../components/profilepic";
import Grid from "@mui/material/Grid";
import BoxCus from "../../components/box_custom";
import ButtonCus from "../../components/button_custom";
import InputCus from "../../components/input_custom";
import InputLargeCus from "../../components/input_large_custom";

export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

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
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Grid container spacing={2}>
          {/* First column */}
          <Grid item xs={3} style={{ display: isMenuOpen ? "block" : "none" }}>
            <BoxCus
              element={
                <div>
                  <ProfilePicture
                    imageSrc={"profilepicture.png"}
                    altText={"profile"}
                    size={200}
                  />
                  <ButtonCus
                    onClick={() => {}}
                    text={"My Profile"}
                    pad={"30px"}
                  />
                  <ButtonCus onClick={() => {}} text={"My Reuests"} />
                  <ButtonCus
                    onClick={() => {}}
                    text={"Settings"}
                    pad={"30px"}
                  />
                  <ButtonCus onClick={() => {}} text={"Logout"} />
                </div>
              }
            />
          </Grid>
          {/* Second column */}
          <Grid
            item
            xs={isMenuOpen ? 9 : 12}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <InputCus
              name={"title"}
              onChange={() => {}}
              placeholder={"Title"}
              style={{ marginBottom: "10px" }} // Adding margin bottom
            />
            <InputLargeCus
              name={"description"}
              width={710}
              placeholder={"Description"}
              style={{ marginBottom: "10px" }} // Adding margin bottom
            />
            <ButtonCus text={"Post"} onClick={() => {}} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
