import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    position: "relative",
    display: "inline-block",
    marginRight: -theme.spacing(2),
  },
  editButton: {
    position: "absolute",
    bottom: theme.spacing(1), // Adjust the bottom value to position the icon vertically
    right: theme.spacing(1), // Adjust the right value to position the icon horizontally
    transform: "translate(50%, 50%)", // Center the icon vertically and horizontally
  },
  hiddenInput: {
    display: "none",
  },
}));



const ProfilePicture = ({
  image,
  altText,
  size,
  isEdit = false,
  setPicFile,
}) => {
  const classes = useStyles();
  const [imageSrc, setImageSrc] = useState(image);
  const fileInputRef = useRef(null);

  const avatarStyle = {
    width: size,
    height: size,
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target.result;
        setImageSrc(newImageSrc); // Update the image source state with the new image
        setPicFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.avatarContainer}>
      <Avatar
        alt={altText}
        src={imageSrc}
        className={classes.avatar}
        style={avatarStyle}
      />
      {isEdit && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={classes.hiddenInput}
            onChange={handleFileChange}
          />
          <IconButton
            className={classes.editButton}
            onClick={handleEditClick}
            size="small"
            sx={{ backgroundColor: "blue", color: "white" }}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default ProfilePicture;
