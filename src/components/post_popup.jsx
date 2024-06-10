import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import InputLargeCus from "./input_large_custom";
import { applyToPost } from "../api/posts";

export default function ApplyPopup({ open, onClose, id }) {
  const [description, setDescription] = React.useState("");

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleApply = async () => {
    applyToPost(id, description).then((response) => {
      if (response.status) {
        alert("Applied to post");
        window.location.reload();
        onClose();
      } else {
        alert("Failed to apply to post");
      }
    });
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
