import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ProfilePicture from "./profilepic";
import { useNavigate } from "react-router-dom";

export default function DrawerCus({ open, onClose }) {
  const navigate = useNavigate();

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
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon sx={{ color: "#3f51b5" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/profilepagefreelancer")}>
          <ListItemIcon sx={{ color: "#3f51b5" }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/requests")}>
          <ListItemIcon sx={{ color: "#3f51b5" }}>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="My Requests" />
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
