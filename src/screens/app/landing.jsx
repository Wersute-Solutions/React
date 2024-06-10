import React from 'react';
import {
  Button,
  Container,
  Box,
  Grid,
  Typography,
  CssBaseline,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1',  
    },
    secondary: {
      main: '#ff6f00',  
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const useStyles = makeStyles((theme) => ({
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #00bcd4 30%, #1a237e 90%)', // Gradient background
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(4),
    animation: '$fadeIn 1s ease-in-out',
    minHeight: '100vh',
    paddingTop: theme.spacing(20), // Adjust padding top for large screens
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20), // Adjust padding top for small screens
    },
  },
  logo: {
    width: 180,
    height: 70,
    marginBottom: theme.spacing(4),
    animation: '$fadeIn 1.5s ease-in-out',
  },
  heroContent: {
    maxWidth: 800,
    color: '#ffffff',
    margin: 'auto',
    animation: '$fadeIn 2s ease-in-out',
  },
  heroButtons: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
    animation: '$fadeIn 2.5s ease-in-out',
  },
  featureSection: {
    width: '100%',
    padding: theme.spacing(8, 2),
    background: 'linear-gradient(135deg, #00bcd4 30%, #1a237e 90%)',
    marginTop: theme.spacing(6),
    animation: '$fadeIn 3s ease-in-out',
  },
  featurePaper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
  },
  contactSection: {
    backgroundColor: '#0d47a1',
    color: '#fff',
    padding: theme.spacing(6, 2),
    animation: '$fadeIn 3.5s ease-in-out',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  contactIcon: {
    marginRight: theme.spacing(1),
  },
  footer: {
    padding: theme.spacing(2),
    backgroundColor: '#0d47a1',
    color: '#fff',
    animation: '$fadeIn 4s ease-in-out',
  },
}));

const Landing = () => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Box className={classes.content}>
          <Container className={classes.heroContent}>
            <img src={"logo.png"} alt="Wersute Logo" className={classes.logo} />
            <Typography variant={isSmallScreen ? 'h4' : 'h2'} component="h1" gutterBottom>
              Connecting Clients & Freelancers
            </Typography>
            <Typography variant={isSmallScreen ? 'body1' : 'h5'} color="inherit" paragraph>
              Wersute is the platform where clients find top talent and freelancers discover exciting projects.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary" size="large" onClick={() => { navigate('/login') }}>
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" size="large" onClick={() => { navigate('/signup') }}>
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
          <Container maxWidth="md">
            <Grid container spacing={4} justifyContent="center" marginTop={"40px"}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={classes.featurePaper}>
                  <Typography variant="h6" gutterBottom>
                    Find the Best Talent
                  </Typography>
                  <Typography>
                    Clients can browse a vast pool of freelancers with various skills and expertise to find the perfect match for their project needs.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={classes.featurePaper}>
                  <Typography variant="h6" gutterBottom>
                    Secure Payments
                  </Typography>
                  <Typography>
                    Our secure system ensures safe transactions for both clients and freelancers, providing peace of mind throughout the project.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={classes.featurePaper}>
                  <Typography variant="h6" gutterBottom>
                    Seamless Messaging
                  </Typography>
                  <Typography>
                    Use our integrated messaging platform to communicate effectively, manage project milestones, and collaborate seamlessly.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box className={classes.contactSection}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom marginBottom={"50px"}>
            Contact Us
          </Typography>
          <Grid container spacing={6} justifyContent="center">
            <Grid item xs={12} sm={4} className={classes.contactItem}>
              <Email className={classes.contactIcon} />
              <Typography variant="body1">contact@wersute.com</Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.contactItem}>
              <Phone className={classes.contactIcon} />
              <Typography variant="body1">wersute ph no</Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.contactItem}>
              <LocationOn className={classes.contactIcon} />
              <Typography variant="body1">Bangalore, India</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <footer className={classes.footer}>
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Wersute. All rights reserved.
        </Typography>
      </footer>
    </ThemeProvider>
  );
};

export default Landing;
