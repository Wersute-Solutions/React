import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  icon: {
    width: "20px",
    marginRight: theme.spacing(1),
  },
}));

export default function SocialButtonCus({ provider, onClick }) {
  const classes = useStyles();

  let buttonColor = "";
  let icon = null;

  switch (provider) {
    case "google":
      buttonColor = "#DB4437";
      icon = (
        <img src="google.png" alt="Google Logo" className={classes.icon} />
      );
      break;
    case "facebook":
      buttonColor = "#3B5998";
      icon = (
        <img src="facebook.png" alt="Facebook Logo" className={classes.icon} />
      );
      break;
    default:
      buttonColor = "#000000";
  }

  return (
    <Button
      variant="contained"
      className={classes.root}
      style={{ backgroundColor: buttonColor, color: "#FFFFFF" }}
      onClick={onClick}
      startIcon={icon}
    >
      {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  );
}
