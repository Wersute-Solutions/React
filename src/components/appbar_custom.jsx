import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function AppBarCus({
  showSearchBar = false,
  onSearch = () => {},
  showMenuIcon = false,
  onMenuIconClick = () => {},
  showNotificationButton = false,
  onNotificationButtonClick = () => {},
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
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
          </Box>

          {/* Notification Button */}
          {showNotificationButton && (
            <IconButton color="inherit" onClick={onNotificationButtonClick}>
              <NotificationsIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
