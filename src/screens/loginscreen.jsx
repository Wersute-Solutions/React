import React, { useState } from "react";
import AppBarCus from "../components/appbar_custom";
import InputCus from "../components/input_custom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonCus from "../components/button_custom";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import SocialButtonCus from "../components/extra_login_custom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleGoogleLogin = () => {};
  const handleLogin = () => {};
  const handleFacebookLogin = () => {};

  return (
    <>
      <AppBarCus />
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
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
        <InputCus
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          pad={3}
        />
        <InputCus
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          pad={1}
        />
        <ButtonCus pad={4} text={"Login"} onClick={handleLogin} />
        <Grid container justifyContent="center" sx={{ py: 2 }}>
          <Grid item>
            <Divider sx={{ borderTop: "1px solid #000", width: "800px" }} />
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
          </div>
          <div style={{ marginLeft: "10px" }}>
            <SocialButtonCus
              provider="facebook"
              onClick={handleFacebookLogin}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
