import React from 'react';
import {
  Button,
  Container,
  Box,
  Grid,
  Typography,
  CssBaseline,
  Paper,
  IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const Landing = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #00bcd4 30%, #1a237e 90%)',
          textAlign: 'center',
          pt: 4,
        }}
      >
        {/* Navigation Buttons */}
        <Box
          sx={{
            position: 'fixed',
            top: theme.spacing(2),
            right: theme.spacing(2),
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: theme.spacing(1),
            p: theme.spacing(1),
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <IconButton
            sx={{
              m: theme.spacing(1),
              backgroundColor: '#0d47a1',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1a237e',
              },
            }}
            onClick={() => scrollToSection('Home')}
            color="inherit"
            aria-label="Home Section"
          >
            <Typography variant="body2">Hero</Typography>
          </IconButton>
          <IconButton
            sx={{
              m: theme.spacing(1),
              backgroundColor: '#0d47a1',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1a237e',
              },
            }}
            onClick={() => scrollToSection('features')}
            color="inherit"
            aria-label="Features Section"
          >
            <Typography variant="body2">Features</Typography>
          </IconButton>
          <IconButton
            sx={{
              m: theme.spacing(1),
              backgroundColor: '#0d47a1',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1a237e',
              },
            }}
            onClick={() => scrollToSection('about')}
            color="inherit"
            aria-label="About Section"
          >
            <Typography variant="body2">About</Typography>
          </IconButton>
          <IconButton
            sx={{
              m: theme.spacing(1),
              backgroundColor: '#0d47a1',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1a237e',
              },
            }}
            onClick={() => scrollToSection('vision')}
            color="inherit"
            aria-label="Vision Section"
          >
            <Typography variant="body2">Vision</Typography>
          </IconButton>
          <IconButton
            sx={{
              m: theme.spacing(1),
              backgroundColor: '#0d47a1',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1a237e',
              },
            }}
            onClick={() => scrollToSection('contact')}
            color="inherit"
            aria-label="Contact Section"
          >
            <Typography variant="body2">Contact</Typography>
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4,
            animation: 'fadeIn 1s ease-in-out',
            minHeight: '100vh',
            pt: 20,
            [theme.breakpoints.down('sm')]: {
              pt: 20,
            },
          }}
        >
          <Container
            sx={{
              maxWidth: 800,
              color: '#ffffff',
              margin: 'auto',
              animation: 'fadeIn 2s ease-in-out',
            }}
          >
            <img src={"logo.png"} alt="Wersute Logo" style={{ width: 180, height: 70, marginBottom: theme.spacing(4), animation: 'fadeIn 1.5s ease-in-out' }} />
            <Typography variant={isSmallScreen ? 'h4' : 'h2'} component="h1" gutterBottom>
              Connecting Clients & Freelancers
            </Typography>
            <Typography variant={isSmallScreen ? 'body1' : 'h5'} color="inherit" paragraph>
              Wersute is the platform where clients find top talent and freelancers discover exciting projects.
            </Typography>
            <Box
              sx={{
                mt: theme.spacing(6),
                [theme.breakpoints.down('sm')]: {
                  mt: theme.spacing(2),
                },
                animation: 'fadeIn 2.5s ease-in-out',
              }}
            >
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
            </Box>
          </Container>
          <Container maxWidth="md">
            <Grid container spacing={4} justifyContent="center" sx={{ mt: '40px' }}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    mt: theme.spacing(4),
                    p: theme.spacing(4),
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    },
                    [theme.breakpoints.down('sm')]: {
                      p: theme.spacing(2),
                      mt: theme.spacing(2),
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Find the Best Talent
                  </Typography>
                  <Typography>
                    Clients can browse a vast pool of freelancers with various skills and expertise to find the perfect match for their project needs.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    mt: theme.spacing(4),
                    p: theme.spacing(4),
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    },
                    [theme.breakpoints.down('sm')]: {
                      p: theme.spacing(2),
                      mt: theme.spacing(2),
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Secure Payments
                  </Typography>
                  <Typography>
                    Our secure system ensures safe transactions for both clients and freelancers, providing peace of mind throughout the project.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    mt: theme.spacing(4),
                    p: theme.spacing(4),
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    },
                    [theme.breakpoints.down('sm')]: {
                      p: theme.spacing(2),
                      mt: theme.spacing(2),
                    },
                  }}
                >
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
        {/* About Us Section */}
        <Box
          id="about"
          sx={{
            width: '100%',
            p: 8,
            background: 'linear-gradient(135deg, #00bcd4 30%, #1a237e 90%)',
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ mt: 4 }}>
            At Wersute, we are dedicated to bridging the gap between clients and freelancers. Our mission is to provide a platform that fosters collaboration, creativity, and success for everyone involved.
          </Typography>
        </Box>
        {/* Vision Section */}
        <Box
          id="vision"
          sx={{
            width: '100%',
            p: 8,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body1" sx={{ mt: 4 }}>
            Our vision is to become the go-to platform for freelance work, offering innovative solutions that empower both clients and freelancers to achieve their goals and thrive in the digital economy.
          </Typography>
        </Box>
        {/* Contact Us Section */}
        <Box
          id="contact"
          sx={{
            width: '100%',
            p: 8,
            backgroundColor: '#0d47a1',
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item>
              <Email sx={{ fontSize: 40 }} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                contact@wersute.com
              </Typography>
            </Grid>
            <Grid item>
              <Phone sx={{ fontSize: 40 }} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                +1 (555) 123-4567
              </Typography>
            </Grid>
            <Grid item>
              <LocationOn sx={{ fontSize: 40 }} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                1234 Wersute St., Freelance City, FL 12345
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* Footer */}
        <Box sx={{ p: 4, backgroundColor: '#1a237e', color: '#ffffff', textAlign: 'center' }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Wersute. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Landing;
