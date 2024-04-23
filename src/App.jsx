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
import HomePageFreelancer from "./screens/app/homepage_free";
import SuccessPage from "./screens/app/success";
import Requests from "./screens/app/requests";
import ProfilePageFreelancer from "./screens/app/profilepage_freelancer";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  const { setCurrentUser, currentUser } = useStore();

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
          <Route
            path="/"
            element={
              currentUser?.profile?.role === "client" ? (
                <HomePageClient />
              ) : (
                currentUser?.profile?.role === "freelancer" && (
                  <HomePageFreelancer />
                )
              )
            }
          />
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
          <Route path="/homefree" element={<HomePageFreelancer />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/requests" element={<Requests />} />
          <Route
            path="/profilepagefreelancer"
            element={<ProfilePageFreelancer isSelf={true} />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
