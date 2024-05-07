 
import React from "react";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const ProfilePictureStatic = ({ imageSrc, altText, size }) => {
  const classes = useStyles();

  return (
    <Avatar
      alt={altText}
      src={imageSrc}  
      className={classes.avatar}
      style={{ width: size, height: size }}
    />
  );
};

export default ProfilePictureStatic;
