import { useState } from "react";
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

export default function Post({
  title,
  description,
  image,
  pay,
  skills,
  duration,
  responsibilities,
  username,
  profilePic,
  date,
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

  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: 600,
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
          }}
        >
          <Avatar
            src={profilePic}
            alt={username}
            sx={{ mr: 2, backgroundColor: blue[500] }}
          >
            {username.charAt(0)}
          </Avatar>
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {username}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: blue[500] }}>
              {new Date(date).toLocaleDateString("en-US", dateOptions)}
            </Typography>
          </div>
        </div>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
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
        <Typography variant="body1" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {pay && (
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Approximate Pay: {pay}
          </Typography>
        )}
        {duration && (
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Duration: {duration}
          </Typography>
        )}
        {skills && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Skills Required:
            </Typography>
            <Chip label={skills} variant="outlined" sx={{ mr: 1, mb: 1 }} />
          </>
        )}
        {responsibilities && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Responsibilities:
            </Typography>
            <Typography variant="body1">{responsibilities}</Typography>
          </>
        )}
        <ButtonCus text={"Apply"} pad={4} onClick={handleApplyClick} />
        <ApplyPopup open={openPopup} onClose={() => setOpenPopup(false)} />{" "}
      </CardContent>
    </Card>
  );
}
