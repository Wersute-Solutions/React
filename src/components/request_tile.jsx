import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: 700,
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  status: {
    marginBottom: theme.spacing(2),
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
    alignItems: "flex-start",
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  applicantDetails: {
    flexGrow: 1,
    minWidth: 0, // Allow text overflow
  },
  acceptButton: {
    marginLeft: "auto",
    marginTop: "auto", // Center the button vertically
    display: "block",
  },
  coverLetter: {
    overflowWrap: "break-word", // Wrap text within the container
    wordWrap: "break-word",
    display: "-webkit-box",
    WebkitLineClamp: 3, // Maximum number of lines
    WebkitBoxOrient: "vertical",
  },
}));

const Tile = ({ title, status, date, applications, assignedTo, onAccept }) => {
  const classes = useStyles();

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
      {status === "Assigned" && assignedTo && (
        <Paper elevation={0} className={classes.application}>
          <Avatar
            alt={assignedTo.name}
            src={assignedTo.profilePic}
            className={classes.avatar}
          />
          <Typography variant="body1" className={classes.applicantDetails}>
            Assigned to: {assignedTo.name}
          </Typography>
        </Paper>
      )}
      {true &&
        applications?.map((application, index) => (
          <>
            <Paper key={index} elevation={0} className={classes.application}>
              <Avatar
                alt={application.applicant_profile?.first_name}
                src={application.profilePic}
                className={application?.applicant_profile?.avatar}
              />
              <div className={classes.applicantDetails}>
                <Typography variant="body1">{`${application.applicant_profile?.first_name} ${application.applicant_profile?.last_name}`}</Typography>
                <Typography variant="body2" className={application.cover_letter}>
                  {application.cover_letter}
                </Typography>
              </div>
              <Button
                onClick={() => onAccept(application)}
                variant="contained"
                color="primary"
                className={classes.acceptButton}
              >
                Accept
              </Button>
            </Paper>
          </>
        ))}
    </Paper>
  );
};

export default Tile;
