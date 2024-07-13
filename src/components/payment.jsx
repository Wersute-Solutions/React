import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, IconButton } from '@mui/material';
import { createPost } from "../api/payment";
import useRazorpay from "react-razorpay";
import CloseIcon from '@mui/icons-material/Close';

const PaymentPopup = ({ open, onClose, onUpdateWallet, walletBalance }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [Razorpay] = useRazorpay();

  const handlePayment = async () => {
    try {
      const response = await createPost(parseInt(amount));
      const { id } = response.data;

      const options = {
        key: 'rzp_test_ELxC3MwbyEqE6V',
        amount: amount * 100,
        currency: "INR",
        name: 'Wersute',
        description: 'Test Transaction',
        order_id: id,
        handler: async (response) => {
          console.log(response);
          await onUpdateWallet();  
        },
        prefill: {
          name: name,
          email: email,
          contact: contact,
        },
        notes: {
          address: address,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    handlePayment();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Enter Payment Details</Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Contact Number"
          type="text"
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Address"
          type="text"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentPopup;
