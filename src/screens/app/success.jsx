import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SuccessPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Successfully Posted
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Your post has been successfully submitted.
        </Typography>
        <IconButton
          sx={{
            marginTop: "20px",
            color: "primary.main",
          }}
          onClick={handleGoBack}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
    </>
  );
}
