import React from "react";
import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";

const StyledAvatar = styled(Avatar)(({ theme, size }) => ({
  width: size,
  height: size,
}));

const ProfilePictureStatic = ({ imageSrc, altText, size }) => {
  return <StyledAvatar alt={altText} src={imageSrc} size={size} />;
};

export default ProfilePictureStatic;