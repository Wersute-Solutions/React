import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { acceptApplication } from "../api/posts";
import { useNavigate } from "react-router-dom";
import ProfilePictureStatic from "./profilepic_static";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "calc(100% - 40px)", 
    Width: 700,  
    margin: "20px auto",  
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  status: {
    marginBottom: theme.spacing(1),
  },
  date: {
    marginBottom: theme.spacing(2),
  },
  application: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    display: "flex",
    alignItems: "center",  
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: `2px solid ${theme.palette.primary.main}`, // Add border
    borderRadius: "50%", // Make avatar round
  },
  applicantDetails: {
    marginLeft: theme.spacing(2),
  },
  acceptButton: {
    marginLeft: "auto",
  },
  coverLetter: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
}));

const Tile = ({ title, status, date, applications, assignedTo }) => {
  const classes = useStyles();
  const navigate = useNavigate();

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

  

  return (
    <Paper elevation={0} className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.status}>
        Status: {status}
      </Typography>
      <Typography variant="body1" className={classes.date}>
        Date: {date}
      </Typography>
      {status === "Assigned" && (
        <Paper elevation={0} className={classes.application}>
          <ProfilePictureStatic imageSrc={formData.avatar} size={80} className={classes.avatar} />
          <Typography variant="body1" className={classes.applicantDetails}>
            Assigned to: {assignedTo?.username}
          </Typography>
        </Paper>
      )}
      {applications?.map((application, index) => (
        <Paper key={index} elevation={0} className={classes.application}>
          <ProfilePictureStatic
            imageSrc={application.applicant_profile?.avatar}
            size={40}
            className={classes.avatar}
          />
          <div className={classes.applicantDetails}>
            <Typography variant="body1">{application.applicant.username}</Typography>
            <Typography variant="body2" className={classes.coverLetter}>
              {application.cover_letter}
            </Typography>
          </div>
          <Button
            onClick={async () => {
              await acceptApplication(application.id, application.applicant_profile.id);
              window.location.reload();
            }}
            variant="contained"
            color="primary"
            className={classes.acceptButton}
          >
            Accept
          </Button>
        </Paper>
      ))}
    </Paper>
  );
};

export default Tile;
