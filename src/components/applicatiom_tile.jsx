import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { requestPayment } from '../api/payment';

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '240px',  
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
      backgroundColor = '#4caf50';  
      break;
    case 'rejected':
      backgroundColor = '#f44336';  
      break;
    case 'pending':
      backgroundColor = '#ff9800';  
      break;
    default:
      backgroundColor = '#bdbdbd';  
  }

  return {
    backgroundColor,
    color: '#fff',
  };
});

const StyledButton = styled(Button)({
  padding: '4px 8px',
  fontSize: '0.75rem',
  textTransform: 'none',
  borderRadius: '20px',
  marginRight: '8px',
});

const NavButton = styled(StyledButton)({
  borderColor: '#007bff',
  color: '#007bff',
  '&:hover': {
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    borderColor: '#007bff',
  },
});

const ChatButton = styled(StyledButton)({
  borderColor: '#ff5722',
  color: '#ff5722',
  '&:hover': {
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    borderColor: '#ff5722',
  },
});

const PaymentButton = styled(StyledButton)({
  borderColor: '#ff9800',
  color: '#ff9800',
  '&:hover': {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderColor: '#ff9800',
  },
});

const ApplicationTile = ({ id, jobTitle, jobStatus, companyName, clientId, myId, paymentStatus, amount }) => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputAmount, setInputAmount] = useState('');
  
  const isPaid = paymentStatus === "paid";
  const isRequested = paymentStatus === "requested";
  
  const navProfile = () => {
    navigate('/profilepageclient/' + String(clientId));
  };
  
  const navChat = () => {
    navigate('/chatscreen/' + String(clientId) + "/" + String(myId));
  };

  const handleRequestPayment = async() => {
    try {
      await requestPayment(id, inputAmount);
      window.location.reload()
    } catch (error) {
      console.error("Payment request failed:", error);
    }
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
        <Box mt={2} display="flex" justifyContent="flex-start">
          <NavButton variant="outlined" onClick={navProfile}>
            View Profile
          </NavButton>
          <ChatButton variant="outlined" onClick={navChat}>
            Chat
          </ChatButton>
          {jobStatus === 'accepted' && !isPaid && (
            <PaymentButton variant="outlined" onClick={() => setDialogOpen(true)}>
              {isRequested ? 'Requested' : 'Request Payment'}
            </PaymentButton>
          )}
        </Box>
        <Box mt={2}>
          {isRequested && (
            <Typography variant="subtitle2">
              Amount: ₹{amount}
            </Typography>
          )}
        </Box>
      </CardContent>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Request Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the amount you would like to request for payment.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRequestPayment} color="primary">
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

export default ApplicationTile;
