import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";

const AvatarContainer = styled('div')(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  marginRight: '-16px',
}));

const EditButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: '8px',
  right: '8px',
  transform: "translate(50%, 50%)",
  backgroundColor: "blue",
  color: "white",
}));

const HiddenInput = styled('input')({
  display: "none",
});

const ProfilePicture = ({ image, altText, size, isEdit = false, setPicFile }) => {
  const [imageSrc, setImageSrc] = useState(image);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target.result;
        setImageSrc(newImageSrc);
        setPicFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AvatarContainer>
      <Avatar
        alt={altText}
        src={imageSrc}
        sx={{ width: size, height: size }}
      />
      {isEdit && (
        <>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <EditButton onClick={handleEditClick} size="small">
            <EditIcon />
          </EditButton>
        </>
      )}
    </AvatarContainer>
  );
};

export default ProfilePicture;
