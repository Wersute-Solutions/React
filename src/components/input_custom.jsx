import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

export default function InputCus({
  placeholder,
  onChange,
  width,
  name,
  isPassword = false,
  marginBottom,
  value,
  isDisabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      name={name}
      type={isPassword ? (showPassword ? 'text' : 'password') : "text"}
      sx={{ width: width || "400px", marginBottom: marginBottom }}
      label={placeholder}
      color="primary"
      onChange={onChange}
      value={value}
      disabled={isDisabled}
      multiline={!isPassword}
      InputProps={{
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
