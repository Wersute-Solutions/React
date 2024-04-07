import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
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

          {/* Search Bar */}
          {showSearchBar && (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                }}
              >
                <SearchIcon style={{ color: "gray" }} />
                <InputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  style={{ marginLeft: "5px" }}
                  onChange={onSearch}
                />
              </div>
            </Box>
          )}

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
