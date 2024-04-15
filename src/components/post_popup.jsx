import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import InputLargeCus from "./input_large_custom";

export default function ApplyPopup({ open, onClose }) {
  const [description, setDescription] = React.useState("");

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleApply = () => {
    console.log("Applying for the job with description:", description);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "80%",
          maxWidth: "none",
        },
      }}
    >
      <DialogTitle>Apply for this role</DialogTitle>
      <DialogContent dividers>
        <InputLargeCus
          placeholder={"Note to the employer"}
          value={description}
          onChange={handleChange}
          width={"100%"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleApply} color="primary" variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
