import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/loginscreen";
import SignUp from "./screens/signupscreen";
import FreeProfileComplete from "./screens/profilecompletefree";
import TempHomeScreen from "./screens/TempHomeScreen";
import "./style.css";
import { useEffect } from "react";
import { checkTokenExpire, getCurrentUser } from "./api/auth";
import { useStore } from "./zustandState";
import ClientProfileComplete from "./screens/profilecompleteclient";

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
          <Route path="/" element={<TempHomeScreen />} />
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
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
