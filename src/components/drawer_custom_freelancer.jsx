import React, { useState, useEffect } from "react";
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
import ProfilePictureStatic from "./profilepic_static";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProfile } from "../api/profileHelpers";
import { useStore } from "../zustandState";
import Backdrop from "@mui/material/Backdrop";


export default function DrawerCus({ open, onClose }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    contact_no: "",
    skills: "",
    projects_and_experience: "",
    github: "",
    linkedin: "",
    bio: "",
    avatar: "",
  });
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const [loggingOut, setLoggingOut] = useState(false);

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

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetchProfile(id);
        setFormData(response[0]);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    if (open) {
      setLoading(true);
      getProfile();
    }
  }, [id, open]);

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
  )

  return (
    <>
    <Drawer open={open} onClose={onClose} variant="temporary" anchor="left">
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
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
              <ProfilePictureStatic
                imageSrc={formData?.avatar}
                altText={"profile"}
                size={150}
              />
            </Box>
            <List sx={{ flexGrow: 1 }}>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon sx={{ color: "#3f51b5" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  navigate("/profilepagefreelancer");
                  window.location.reload(false);
                }}
              >
                <ListItemIcon sx={{ color: "#3f51b5" }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/applications")}>
                <ListItemIcon sx={{ color: "#3f51b5" }}>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="My Applications" />
              </ListItemButton>
            </List>
            <List>
              <ListItemButton sx={{ justifyContent: "flex-end" }} onClick={handleLogout}>
                <ListItemIcon sx={{ color: "red" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </>
        )}
      </Box>
    </Drawer>
    <LoadingScreen open={loggingOut} />
    </>
  );
}
