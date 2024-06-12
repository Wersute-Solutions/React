import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '220px', // Adjust height to accommodate additional content
  width: '300px',
  margin: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
});

const StatusChip = styled(Chip)(({ status }) => {
  let backgroundColor;
  switch (status) {
    case 'accepted':
      backgroundColor = '#4caf50'; // green
      break;
    case 'rejected':
      backgroundColor = '#f44336'; // red
      break;
    case 'pending':
      backgroundColor = '#ff9800'; // orange
      break;
    default:
      backgroundColor = '#bdbdbd'; // grey
  }

  return {
    backgroundColor,
    color: '#fff',
  };
});

const NavButton = styled(Button)({
  marginTop: '16px',
  alignSelf: 'flex-start',
  borderColor: '#007bff',
  color: '#007bff',
  '&:hover': {
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    borderColor: '#007bff',
  },
  padding: '4px 8px',
  fontSize: '0.75rem',
  textTransform: 'none',
  borderRadius: '20px'
});

const ApplicationTile = ({ jobTitle, jobStatus, companyName, clientId }) => {
  const navigate = useNavigate();
  const nav = () => {
    navigate("/profilepageclient/" + String(clientId));
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" component="div">
          {jobTitle}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {companyName}
        </Typography>
        <Box mt={2}>
          <StatusChip label={jobStatus} status={jobStatus} />
        </Box>
        <NavButton variant="outlined" onClick={nav}>
          View Profile
        </NavButton>
      </CardContent>
    </StyledCard>
  );
};

export default ApplicationTile;
