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
      main: '#0d47a1', // Dark Blue
    },
    secondary: {
      main: '#ff6f00', // Orange
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #00bcd4 30%, #1a237e 90%)', // Gradient background
        textAlign: 'center',
        '& > *': {
      margin: theme.spacing(2), // Add margin between elements
    },
      },
  logo: {
    width: 180,
    height: 80,
    marginBottom: theme.spacing(4),
  },
  heroContent: {
    maxWidth: 800,
    color: '#ffffff',
    margin: 'auto',
    padding: theme.spacing(4),
  },
  heroButtons: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  featureSection: {
    width: '100%',
    padding: theme.spacing(8, 2),
    background: 'linear-gradient(135deg, #00bcd4 30%, #1a237e 90%)',
    marginTop: theme.spacing(6),
  },
  featurePaper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
  },
  contactSection: {
    backgroundColor: '#0d47a1',
    color: '#fff',
    padding: theme.spacing(6, 2),
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
        <Container className={classes.heroContent}>
          <img src={"logo.png"} alt="Wersute Logo" className={classes.logo} />
          <Typography variant={isSmallScreen ? 'h4' : 'h2'} component="h1" gutterBottom>
            Connect Clients & Freelancers
          </Typography>
          <Typography variant={isSmallScreen ? 'body1' : 'h5'} color="inherit" paragraph>
            Wersute helps you connect with the best freelancers for your projects.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="primary" size="large" onClick={()=>{navigate('/login')}}>
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" size="large" onClick={()=>{navigate('/signup')}}>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
        <Container maxWidth="md">
          <Grid container spacing={4} marginBottom={"80px"}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className={classes.featurePaper}>
                <Typography variant="h6" gutterBottom>
                  Discover Top Talent
                </Typography>
                <Typography>
                  Browse through a vast pool of freelancers with various skills and expertise. Find the perfect match for your project requirements.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className={classes.featurePaper}>
                <Typography variant="h6" gutterBottom>
                  Secure Transactions
                </Typography>
                <Typography>
                  Enjoy safe and secure transactions with our escrow system, ensuring peace of mind for both clients and freelancers.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className={classes.featurePaper}>
                <Typography variant="h6" gutterBottom>
                  Efficient Messaging
                </Typography>
                <Typography>
                  Use our integrated messaging platform to communicate effectively and manage project milestones seamlessly.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
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
              <Typography variant="body1">+1 (123) 456-7890</Typography>
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
