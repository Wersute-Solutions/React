import React, { useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useStore } from "../zustandState";
import Backdrop from "@mui/material/Backdrop";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { fetchNotifications } from "../api/posts";

export default function DrawerCus({ open, onClose }) {
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const [loggingOut, setLoggingOut] = useState(false);

  const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    setLoggingOut(true);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setCurrentUser(null);
    setTimeout(() => {
      setLoggingOut(false);
      navigate("/landing", { replace: true });
    }, 1000);
  };

  const handleFetchNotifications = async () => {
    try {
      const notifications = await fetchNotifications();
      console.log("Notifications:", notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const LoadingScreen = ({ open }) => (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  const drawerContent = (
    <Box
      sx={{
        width: isMobile ? 260 : 90,  
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        height: "100%",
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        {!isMobile && (
          <ListItemButton>
            <ListItemIcon sx={{ color: "#3f51b5", minWidth: 0 }}>
              <img
                src="/favicon.png"
                alt="Favicon"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
          </ListItemButton>
        )}
        <Tooltip title="Home" placement="right">
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon sx={{ color: "#3f51b5", minWidth: 0 }}>
              <HomeIcon fontSize="medium" />
            </ListItemIcon>
            {isMobile && (
              <ListItemText
                primary="Home"
                sx={{ pl: 2, fontSize: '1.1rem', fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
        <Tooltip title="My Profile" placement="right">
          <ListItemButton
            onClick={() => {
              navigate("/profilepagefreelancer");
              window.location.reload(false);
            }}
          >
            <ListItemIcon sx={{ color: "#3f51b5", minWidth: 0 }}>
              <AccountCircleIcon fontSize="medium" />
            </ListItemIcon>
            {isMobile && (
              <ListItemText
                primary="My Profile"
                sx={{ pl: 2, fontSize: '1.1rem', fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
        <Tooltip title="My Applications" placement="right">
          <ListItemButton onClick={() => navigate("/applications")}>
            <ListItemIcon sx={{ color: "#3f51b5", minWidth: 0 }}>
              <FolderIcon fontSize="medium" />
            </ListItemIcon>
            {isMobile && (
              <ListItemText
                primary="My Applications"
                sx={{ pl: 2, fontSize: '1.1rem', fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Notifications" placement="right">
          <ListItemButton onClick={handleFetchNotifications}>
            <ListItemIcon sx={{ color: "#3f51b5", minWidth: 0 }}>
              <NotificationsIcon fontSize="medium" />
            </ListItemIcon>
            {isMobile && (
              <ListItemText
                primary="Notifications"
                sx={{ pl: 2, fontSize: '1.1rem', fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </List>
      <List>
        <Tooltip title="Logout" placement="right">
          <ListItemButton
            sx={{ justifyContent: "center" }}
            onClick={handleLogout}
          >
            <ListItemIcon sx={{ color: "red", minWidth: 0 }}>
              <LogoutIcon fontSize="medium" />
            </ListItemIcon>
            {isMobile && (
              <ListItemText
                primary="Logout"
                sx={{ pl: 2, fontSize: '1.1rem', fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
      >
        {drawerContent}
      </Drawer>
      <LoadingScreen open={loggingOut} />
    </>
  );
}
