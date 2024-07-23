import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import ButtonCus from "./button_custom";
import ApplyPopup from "./post_popup";
import { useNavigate } from "react-router-dom";
 

export default function Post({
  id,
  title,
  description,
  image,
  pay,
  skills,
  duration,
  responsibilities,
  username,
  date,
  profilePic,
  user_id,
}) {
  const [openPopup, setOpenPopup] = useState(false);
  const handleApplyClick = () => {
    setOpenPopup(true);
  };

  const dateOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
 


  const navigate = useNavigate();


  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: 600,
        width: "90vw",
        marginBottom: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={
            ()=>{
              navigate(`/profilepageclient/${user_id}`)
            }
          }
        >
          <Avatar
            src={ profilePic ? profilePic : "profilepicture.png"}
            alt={username}
            sx={{ mr: 2, backgroundColor: blue[500] }}
          >
            {username.charAt(0)}
          </Avatar>
          <div>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", whiteSpace: "pre-line" }}
            >
              {username}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: blue[500], whiteSpace: "pre-line" }}
            >
              {new Date(date).toLocaleDateString("en-US", dateOptions)}
            </Typography>
          </div>
        </div>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1, whiteSpace: "pre-line" }}
        >
          {title}
        </Typography>
        {image && (
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              marginBottom: "10px",
            }}
            image={image}
            alt={title}
          />
        )}
        <Typography variant="body1" sx={{ mb: 2, whiteSpace: "pre-line" }}>
          {description}
        </Typography>
        {pay && (
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, whiteSpace: "pre-line" }}
          >
            Approximate Pay: {pay}
          </Typography>
        )}
        {duration && (
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, whiteSpace: "pre-line" }}
          >
            Duration: {duration}
          </Typography>
        )}
        {skills && (
          <>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, whiteSpace: "pre-line" }}
            >
              Skills Required:
            </Typography>
            <Chip label={skills} variant="outlined" sx={{ mr: 1, mb: 1 }} />
          </>
        )}
        {responsibilities && (
          <>
            <Typography
              variant="subtitle1"
              sx={{ mt: 2, whiteSpace: "pre-line" }}
            >
              Responsibilities:
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {responsibilities}
            </Typography>
          </>
        )}
        <ButtonCus text={"Apply"} pad={4} onClick={handleApplyClick} />
        <ApplyPopup
          id={id}
          open={openPopup}
          onClose={() => setOpenPopup(false)}
        /> 
      </CardContent>
    </Card>
  );
}
