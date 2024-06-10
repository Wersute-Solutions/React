import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBarCus from "../../components/appbar_custom";
import InputCus from "../../components/input_custom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonCus from "../../components/button_custom";
import Backdrop from "@mui/material/Backdrop";
import { signupUser } from "../../api/auth";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [retypepassword, setRetypePassword] = useState("");
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.includes(" ")) {
      errors.username = "Username must not contain spaces";
    } else if (username.length < 8) {
      errors.username = "Username must be at least 8 characters";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (password !== retypepassword) {
      errors.retypepassword = "Passwords do not match";
    }

    setErrors(errors);
    setShowAlert(Object.keys(errors).length > 0);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setBackdropOpen(true);

    const response = await signupUser({ username, email, password });
    if (response.status) {
      alert("Signup success, You can login now!");
      navigate("/choice");
    } else {
      setBackdropOpen(false);
      alert(response.message);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <AppBarCus isclickable={false} />
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
        ></Backdrop>
        <Typography
          fontWeight={700}
          style={{ textAlign: "center", paddingTop: "50px", fontSize: "30px" }}
        >
          Create your account
        </Typography>
        {showAlert && (
          <Alert severity="error" style={{ maxWidth: "400px", width: "100%", margin: "10px 0" }}>
            <AlertTitle>Error</AlertTitle>
            {Object.values(errors).map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            maxWidth: "400px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Typography
            fontWeight={300}
            style={{ textAlign: "center", paddingTop: "5px", fontSize: "13px" }}
          >
            Already have an account?
          </Typography>
          <Button
            variant="text"
            style={{
              textTransform: "none",
              backgroundColor: "transparent",
              border: "none",
              marginLeft: "5px",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            <Typography
              style={{
                textAlign: "center",
                paddingTop: "5px",
                fontSize: "13px",
                color: "#1976d2",
              }}
            >
              Login
            </Typography>
          </Button>
        </div>
        <div style={{ marginBottom: "10px", maxWidth: "400px", width: "100%" }}>
          <InputCus
            placeholder="What should we call you"
            onChange={(e) => setUsername(e.target.value)}
            width={"100%"}
          />
        </div>
        <div style={{ marginBottom: "10px", maxWidth: "400px", width: "100%" }}>
          <InputCus
            placeholder="What's your email"
            onChange={(e) => setEmail(e.target.value)}
            width={"100%"}
          />
        </div>
        <div style={{ marginBottom: "10px", maxWidth: "400px", width: "100%" }}>
          <InputCus
            isPassword={true}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            width={"100%"}
          />
        </div>
        <div style={{ marginBottom: "10px", maxWidth: "400px", width: "100%" }}>
          <InputCus
            isPassword={true}
            placeholder="Retype Password"
            onChange={(e) => setRetypePassword(e.target.value)}
            width={"100%"}
          />
        </div>
        <ButtonCus pad={2} text={"SignUp"} onClick={handleSignup} />
      </div>
    </>
  );
}

export default SignUp;
