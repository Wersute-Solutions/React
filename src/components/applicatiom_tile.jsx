import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '180px', // Adjust height to accommodate additional content
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
    case 'Accepted':
      backgroundColor = '#4caf50'; // green
      break;
    case 'Rejected':
      backgroundColor = '#f44336'; // red
      break;
    case 'Ongoing':
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

const ApplicationTile = ({ jobTitle, jobStatus, companyName }) => {
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
      </CardContent>
    </StyledCard>
  );
};

export default ApplicationTile;
