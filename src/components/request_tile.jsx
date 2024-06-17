import { makeStyles } from "@mui/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { acceptApplication } from "../api/posts";
import { useNavigate } from "react-router-dom";

import React from "react";
 
const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(2),
    width: "100%",  
    [theme.breakpoints.up("sm")]: {
      maxWidth: 450,  
     },
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
  summaryContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
  },
  status: {
    marginLeft: theme.spacing(2),
    fontWeight: "bold",
  },
  date: {
    marginLeft: theme.spacing(2),
    fontWeight: "bold",
  },
  detailsContent: {
    display: "flex",
    flexDirection: "column",
  },
  applicantDetails: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: `2px solid ${theme.palette.primary.main}`,
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
  },
  viewProfileButton: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  applicationCard: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  coverLetterContainer: {
    display: "flex",
    flexDirection: "column",
  },
  coverLetterChunk: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },
  chatButton: {
    borderColor: theme.palette.secondary.main, // Example secondary color
    color: theme.palette.secondary.main,
  },
}));

const splitTextIntoChunks = (text, chunkSize) => {
  const regex = new RegExp(`.{1,${chunkSize}}`, "g");
  return text.match(regex) || [];
};

const Tile = ({ title, status, date, applications, assignedTo,}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleViewProfile = (freeId) => {
     navigate(`/profilepagefreelancer/${freeId}`);
  };

  const handleChat = (freelancerId)=>{
    navigate(`/chatscreen/${user.user_id}/${freelancerId}/`);
  }

  const handleAcceptApplication = async (applicationId, profileId) => {
    await acceptApplication(applicationId, profileId);
    window.location.reload(); 
  };

  return (
    <Card className={classes.card}>
      <Accordion className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.summaryContent}>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="body1" className={classes.status}>
              Status: {status}
            </Typography>
            <Typography variant="body1" className={classes.date}>
              Date: {date}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.detailsContent}>
          {status === "Assigned" && (
            <div className={classes.applicantDetails}>
              <Avatar src={assignedTo?.avatar} className={classes.avatar} />
              <div>
                <Typography variant="body1">
                  Assigned to: {assignedTo?.username}
                </Typography>
                <Button
                  variant="outlined"
                  className={classes.viewProfileButton}
                  onClick={() => handleViewProfile(assignedTo?.id)}
                >
                  View Profile
                </Button>
                <Button
                    variant="outlined"
                    className={classes.chatButton}
                    onClick={() => handleChat(assignedTo?.id)}
                  >
                    Chat
                  </Button>
              </div>
            </div>
          )}

          {applications?.map((application, index) => (
            <Card variant="outlined" className={classes.applicationCard} key={index}>
              <CardContent>
                <div className={classes.applicantDetails}>
                  <Avatar src={application.applicant_profile?.avatar} className={classes.avatar} />
                  <div>
                    <Typography variant="body1">
                      {application.applicant.username}
                    </Typography>
                    <div className={classes.coverLetterContainer}>
                      {splitTextIntoChunks(application.cover_letter, 30).map((chunk, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          className={classes.coverLetterChunk}
                        >
                          {chunk}
                        </Typography>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() =>
                    handleAcceptApplication(application.id, application.applicant_profile.id)
                  }
                  variant="contained"
                  color="primary"
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  className={classes.viewProfileButton}
                  onClick={() =>
                    handleViewProfile(application.applicant.id)
                  }
                >
                  View Profile
                </Button>
                <Button
                    variant="outlined"
                    className={classes.chatButton}
                    onClick={() => handleChat(application.applicant.id)}
                  >
                    Chat
                  </Button>
              </div>
            </Card>
          ))}
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default Tile;
