import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/authentication/loginscreen";
import SignUp from "./screens/authentication/signupscreen";
import FreeProfileComplete from "./screens/authentication/profilecompletefree";
import "./style.css";
import { useEffect } from "react";
import { checkTokenExpire, getCurrentUser } from "./api/auth";
import { useStore } from "./zustandState";
import ClientProfileComplete from "./screens/authentication/profilecompleteclient";
import HomePageClient from "./screens/app/homepage_client";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  const { setCurrentUser } = useStore();

  async function userSetHandle() {
    const user = await getCurrentUser();
    setCurrentUser(user);
  }

  useEffect(() => {
    userSetHandle();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkTokenExpire();
      console.log("Checking token expire");
    }, 1000 * 10);
    return () => clearInterval(intervalId);
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/completefreelancerprofile"
            element={<FreeProfileComplete />}
          />
          <Route
            path="/completeclientprofile"
            element={<ClientProfileComplete />}
          />
          <Route path="/home" element={<HomePageClient />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
