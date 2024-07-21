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
  Snackbar,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { acceptApplication } from "../api/posts";
import { useNavigate } from "react-router-dom";
import { acceptPayment } from '../api/payment';
import React, { useState } from "react";
import MuiAlert from '@mui/material/Alert';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
    display: "flex",
    alignItems: "center",
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
  baseButton: {
    padding: '4px 8px',
    fontSize: '0.75rem',
    textTransform: 'none',
    borderRadius: '20px',
    marginRight: '8px',
  },
  viewProfileButton: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 0.1)',
      borderColor: theme.palette.primary.main,
    },
  },
  chatButton: {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: 'rgba(255, 87, 34, 0.1)',
      borderColor: theme.palette.secondary.main,
    },
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
  paymentStatusContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  paymentStatusText: {
    fontWeight: "bold",
  },
  paymentStatusIcon: {
    marginLeft: theme.spacing(1),
  },
  amountContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
}));

const splitTextIntoChunks = (text, chunkSize) => {
  const regex = new RegExp(`.{1,${chunkSize}}`, "g");
  return text.match(regex) || [];
};

const Tile = ({ id, title, status, date, applications, assignedTo, amount, paymentStatus }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleViewProfile = (freeId) => {
    navigate(`/profilepagefreelancer/${freeId}`);
  };
  
  const handleChat = (freelancerId) => {
    navigate(`/chatscreen/${user.user_id}/${freelancerId}/`);
  }

  const handleAcceptApplication = async (applicationId, profileId) => {
    setLoading(true);
    try {
      const response = await acceptApplication(applicationId, profileId);
      if (response.status_code === 200) {
        setSuccess('Application accepted successfully');
        window.location.reload();
      } else {
        setError(`Failed to accept the application. Status code: ${response.status_code}`);
      }
    } catch (error) {
      setError(`An error occurred: ${error.response?.status || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptPayment = async () => {
    setLoading(true);
    try {
      const response = await acceptPayment(id);
      if (response.status_code === 200) {
        setSuccess('Payment accepted successfully');
        window.location.reload();
      } else {
        setError(`Failed to accept the payment. Status code: ${response.status}`);
      }
    } catch (error) {
      setError(`An error occurred: ${error.response?.status || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
    setSuccess('');
  };

  return (
    <Card className={classes.card} style={{ marginLeft: isMobile ? 0 : '50px' }}>
      <Accordion className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.summaryContent}>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <div className={classes.status}>
              {status === "Accepted" ? (
                <CheckCircleIcon color="success" />
              ) : status === "Rejected" ? (
                <CancelIcon color="error" />
              ) : (
                <Typography variant="body1">{status}</Typography>
              )}
            </div>
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
                  className={`${classes.baseButton} ${classes.viewProfileButton}`}
                  onClick={() => handleViewProfile(assignedTo?.id)}
                >
                  View Profile
                </Button>
                <Button
                  variant="outlined"
                  className={`${classes.baseButton} ${classes.chatButton}`}
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
                    handleAcceptApplication(application.id, application.applicant.id)
                  }
                  variant="contained"
                  color="primary"
                  className={classes.baseButton}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Accept'}
                </Button>
                <Button
                  variant="outlined"
                  className={`${classes.baseButton} ${classes.viewProfileButton}`}
                  onClick={() =>
                    handleViewProfile(application.applicant.id)
                  }
                >
                  View Profile
                </Button>
                <Button
                  variant="outlined"
                  className={`${classes.baseButton} ${classes.chatButton}`}
                  onClick={() => handleChat(application.applicant.id)}
                >
                  Chat
                </Button>
              </div>
            </Card>
          ))}

          {amount !== 0 && (
            <div className={classes.amountContainer}>
              <Typography variant="body1" className={classes.paymentStatusText}>
                Amount: ${amount}
              </Typography>
              {paymentStatus === "requested" ? (
                <Button
                  onClick={handleAcceptPayment}
                  variant="contained"
                  color="primary"
                  className={classes.baseButton}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Accept Payment'}
                </Button>
              ) : (
                <div className={classes.paymentStatusContainer}>
                  <Typography
                    variant="body1"
                    className={classes.paymentStatusText}
                    color="textSecondary"
                  >
                    Payment Status: Settled
                  </Typography>
                  <CheckCircleIcon color="success" className={classes.paymentStatusIcon} />
                </div>
              )}
            </div>
          )}
        </AccordionDetails>
      </Accordion>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          {success}
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default Tile;
