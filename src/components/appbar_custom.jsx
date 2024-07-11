import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import PaymentPopup from "./payment"; 
import { useStore } from "../zustandState";

export default function AppBarCus({
  showMenuIcon = false,
  onMenuIconClick = () => {},
  showNotificationButton = false,
  onNotificationButtonClick = () => {},
  fixed = false,
  isclickable = true,
  iswallet = true
}) {
  const navigate = useNavigate();
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleOpenPaymentPopup = () => {
    setPaymentPopupOpen(true);
  };

  const handleClosePaymentPopup = () => {
    setPaymentPopupOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={fixed ? "fixed" : "static"} color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Menu Icon */}
          {showMenuIcon && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuIconClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <div onClick={isclickable ? handleLogoClick : () => {}} style={{ cursor: "pointer" }}>
              <img
                src="logo.png"
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100px",
                  height: "auto",
                }}
              />
            </div>
          </Box>

          {/* Payment Button */}
          {iswallet &&
          <Button color="inherit" onClick={handleOpenPaymentPopup}>
            Your Wallet: {user.profile.wallet_balance}
          </Button>}

          {/* Notification Button */}
          {showNotificationButton && (
            <IconButton color="inherit" onClick={onNotificationButtonClick}>
              <NotificationsIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Payment Popup */}
      <PaymentPopup open={isPaymentPopupOpen} onClose={handleClosePaymentPopup} />
    </Box>
  );
}
