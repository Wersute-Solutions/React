import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputCus from "../../components/input_custom";
import ButtonCus from "../../components/button_custom";
//import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { loginUser } from "../../api/auth";
import { useStore } from "../../zustandState";
import AppBarCus from "../../components/appbar_custom";
//import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Use Zustand to set and get the current user state
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const currentUser = useStore((state) => state.currentUser);

  //const googleLogin = useGoogleLogin({});

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  /*const handleGoogleLogin = () => {
    handleOpen();
  };*/

  // Handle login logic
  const handleLogin = async () => {
    handleOpen(); // Show loading indicator
    try {
      const data = await loginUser({ username, password });
      console.log("user_set: ", data.user);
      setCurrentUser(data.user); // Set the current user in the state
      if (data.status) {
        navigate("/"); // Navigate to the home page on successful login
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setOpen(false); // Hide loading indicator
    }
  };

  // Trigger login on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  /*const handleFacebookLogin = () => {
    handleOpen();
  };*/

  return (
    <>
      <AppBarCus isclickable = {false}/>
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
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Typography
          fontWeight={700}
          style={{ textAlign: "center", paddingTop: "50px", fontSize: "30px" }}
        >
          Login
        </Typography>
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
            Don't have an account yet?
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
              navigate("/signup");
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
              Sign Up
            </Typography>
          </Button>
        </div>
        <div
          style={{
            marginBottom: "10px",
            maxWidth: "400px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <InputCus
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress} // Add key press handler
            width={"300px"}
          />
        </div>
        <br />
        <div
          style={{
            marginBottom: "10px",
            maxWidth: "400px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <InputCus
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress} // Add key press handler
            isPassword
            width={"300px"}
          />
        </div>

        <ButtonCus pad={4} text={"Login"} onClick={handleLogin} />
        {/*
        <Grid container justifyContent="center" sx={{ py: 2 }}>
          <Grid item xs={12} style={{ maxWidth: "400px" }}>
            <Divider sx={{ borderTop: "1px solid #000", width: "100%" }} />
          </Grid>
        </Grid>
        <Typography variant="body1" align="center">
          Or continue with
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
           <div style={{ marginRight: "10px" }}>
            <SocialButtonCus provider="google" onClick={handleGoogleLogin} />
            <div>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  const token = credentialResponse.credential;
                  console.log(token);
                  const user = getGoogleUser(token);
                  console.log(user);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
          <div style={{ marginLeft: "10px" }}>
            <SocialButtonCus
              provider="facebook"
              onClick={handleFacebookLogin}
            />
          </div> 
        </div>*/}
      </div>
    </>
  );
}

export default Login;
