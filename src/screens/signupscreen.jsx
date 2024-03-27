import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBarCus from "../components/appbar_custom";
import InputCus from "../components/input_custom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonCus from "../components/button_custom";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import SocialButtonCus from "../components/extra_login_custom";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Backdrop from "@mui/material/Backdrop";
import { signupUser } from "../api/auth";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [retypepassword, setRetypePassword] = useState("");
  const [value, setValue] = React.useState("freelancer");
  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSignup = async () => {
    setBackdropOpen(true);

    if (password !== retypepassword) {
      alert("Password does not match");
      setBackdropOpen(false);

      return;
    }
    const response = await signupUser({ username, email, password });
    if (response.status) {
      alert("Signup success, You can login now!");
      navigate("/login");
    } else {
      setBackdropOpen(false);

      alert(response.message);
    }
  };

  const navigate = useNavigate();

  const handleGoogleLogin = () => {};

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
            Aleredy have an account?
          </Typography>
          <Button
            variant="text"
            style={{
              textTransform: "none",
              backgroundColor: "transparent",
              border: "none",
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
        <InputCus
          placeholder="What should we call you"
          onChange={(e) => setUsername(e.target.value)}
          pad={1}
        />
        <InputCus
          placeholder="What's your email"
          onChange={(e) => setEmail(e.target.value)}
          pad={3}
        />
        <InputCus
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          pad={1}
        />
        <InputCus
          placeholder="Retype Password"
          onChange={(e) => setRetypePassword(e.target.value)}
          pad={3}
        />
        <Grid container justifyContent="center" sx={{ py: 1 }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="freelancer"
                control={<Radio />}
                label="Freelancer"
              />
              <FormControlLabel
                value="Client"
                control={<Radio />}
                label="Client"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <ButtonCus pad={2} text={"SignUp"} onClick={handleSignup} />
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

export default SignUp;
