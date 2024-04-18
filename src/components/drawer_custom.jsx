import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home"; // Import Home icon
import ProfilePicture from "./profilepic";

export default function DrawerCus({ open, onClose }) {
  const drawerContent = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        height: "100%",
      }}
    >
      <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
        <ProfilePicture
          imageSrc={"profilepicture.png"}
          altText={"profile"}
          size={150}
        />
      </Box>
      <List sx={{ flexGrow: 1 }}>
        <ListItemButton>
          <ListItemIcon sx={{ color: "#3f51b5" }}>
            <HomeIcon /> {/* Home icon */}
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ color: "#3f51b5" }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ color: "#3f51b5" }}>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="My Requests" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ color: "#3f51b5" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
      <List>
        <ListItemButton sx={{ justifyContent: "flex-end" }}>
          <ListItemIcon sx={{ color: "red" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose} variant="temporary" anchor="left">
      {drawerContent}
    </Drawer>
  );
}
